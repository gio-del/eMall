const pool = require('../db/db')
const distance = require('./utils')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const dedent = require('dedent')

exports.getQueryManager = async () => {

    /**
     * Standardize the date to the nearest minute and convert it to UTC
     * @param {*} date the date to standardize
     * @returns the standardized date
     */
    const standardize = (date) => {
        const time = new Date(date)
        time.setSeconds(0)
        return time.toUTCString()
    }

    return {

        /**
         * create a new user
         * @param {*} firstName the first name of the user
         * @param {*} lastName the last name of the user
         * @param {*} password the password of the user
         * @param {*} phoneNumber the phone number of the user
         * @returns the ID of the new user
         */
        createDriver: async (firstName, lastName, password, phoneNumber) => {
            const hash = await bcrypt.hash(password, 10)
            const res = await pool.query('INSERT INTO DRIVER(first_name, last_name, password, phone) VALUES($1,$2,$3,$4) RETURNING *', [firstName, lastName, hash, phoneNumber])
            return res.rows[0].id
        },

        /**
         * Create a new EVCP
         * @param {*} companyName the name of the company
         * @param {*} password the password of the CPO
         * @param {*} email the email of the CPO
         * @returns the ID of the new CPO
         */
        createCPO: async (companyName, password, email) => {
            const hash = await bcrypt.hash(password, 10)
            const res = await pool.query('INSERT INTO CPO(company_name, password, email) VALUES($1,$2,$3) RETURNING *', [companyName, hash, email])
            return res.rows[0].id
        },

        /**
         * Find a driver by its phone number
         * @param {*} phoneNumber the phone number of the driver
         * @returns the ID of the driver
         */
        findDriverByPhoneNumber: async (phoneNumber) => {
            const res = await pool.query('SELECT * FROM DRIVER WHERE phone = $1', [phoneNumber])
            const row = res.rows[0]
            return row ? { driverID: row.id } : undefined
        },

        /**
         * Find a CPO by its email
         * @param {*} email the email of the CPO
         * @returns the ID of the CPO
         */
        findCPOByEmail: async (email) => {
            const res = await pool.query('SELECT * FROM CPO WHERE email = $1', [email])
            const row = res.rows[0]
            return row ? { cpoID: row.id } : undefined
        },

        /**
         * Check if the credentials of a driver are correct. It uses bcrypt to compare the password
         * @param {*} phoneNumber the phone number of the driver
         * @param {*} password the password of the driver
         * @returns true if the credentials are correct, false otherwise
         */
        checkDriverCredentials: async (phoneNumber, password) => {
            const res = await pool.query('SELECT * FROM DRIVER WHERE phone = $1', [phoneNumber])
            user = res.rows[0]
            return bcrypt.compareSync(password, user.password)
        },

        /**
         * Check if the credentials of a CPO are correct. It uses bcrypt to compare the password
         * @param {*} email the email of the CPO
         * @param {*} password the password of the CPO
         * @returns true if the credentials are correct, false otherwise
         */
        checkCPOCredentials: async (email, password) => {
            const res = await pool.query('SELECT * FROM CPO WHERE email = $1', [email])
            user = res.rows[0]
            return bcrypt.compareSync(password, user.password)
        },

        /**
         * Create a new token for a CPO
         * @param {*} cpoID the ID of the CPO
         * @returns the token
         */
        createCPOToken: async (cpoID) => {
            await pool.query('DELETE FROM TOKEN WHERE cpo_id = $1', [cpoID])
            let token = uuid.v4()
            let tokenTuple = await pool.query('INSERT INTO TOKEN(cpo_id, token) VALUES($1, $2) RETURNING *', [cpoID, token])

            while (tokenTuple.rowCount === 0) {
                token = uuid.v4()
                tokenTuple = await pool.query('INSERT INTO TOKEN(cpo_id, token) VALUES($1, $2) RETURNING *', [cpoID, token])
            }
            const row = tokenTuple.rows[0]
            return row.token
        },

        /**
         * Create a new token for a driver
         * @param {*} driverID the ID of the driver
         * @returns the token
         */
        createDriverToken: async (driverID) => {
            await pool.query('DELETE FROM TOKEN WHERE driver_id = $1', [driverID])
            let token = uuid.v4()
            let tokenTuple = await pool.query('INSERT INTO TOKEN(driver_id, token) VALUES($1, $2) RETURNING *', [driverID, token])

            while (tokenTuple.rowCount === 0) {
                token = uuid.v4()
                tokenTuple = await pool.query('INSERT INTO TOKEN(driver_id, token) VALUES($1, $2) RETURNING *', [driverID, token])
            }
            const row = tokenTuple.rows[0]
            return row.token
        },

        /**
         * Validate the token of a driver or a CPO
         * @param {*} token the token to validate
         * @returns an object containing the ID of the driver and the ID of the CPO if the token is valid, undefined otherwise
         */
        validateToken: async (token) => {
            const res = await pool.query('SELECT * FROM TOKEN WHERE token = $1', [token])
            const row = res.rows[0]
            return row ? { driverID: row.driver_id, cpoID: row.cpo_id } : undefined
        },

        /**
         * This function is used to verify if an EVCP is associated with to CPO
         * @param {*} cpoID the ID of the CPO
         * @param {*} evcpID the ID of the EVCP
         * @returns true if the EVCP is associated with the CPO, false otherwise
         */
        verifyEVCPAssociation: async (cpoID, evcpID) => {
            const res = await pool.query('SELECT * FROM EVCP WHERE id = $1 AND cpo_id = $2', [evcpID, cpoID])
            return res.rowCount === 1
        },

        /**
         * Create a code for the verification of a driver
         * @param {*} driverID the ID of the driver
         * @param {*} code the code associated with the driver
         * @returns an object containing the ID of the code, the ID of the driver, the expiry date of the code and the code itself
         */
        createDriverVerificationCode: async (driverID, code) => {
            const res = await pool.query("INSERT INTO DRIVER_CODE(driver_id,expiry_date,code) VALUES($1, NOW() + INTERVAL '120 SECONDS', $2) RETURNING *", [driverID, code]);
            const row = res.rows[0]
            return row ? { id: row.id, driverID: row.driver_id, expiryDate: new Date(row.expiry_date), code: row.code } : undefined
        },

        /**
         * Create a code for the verification of a CPO
         * @param {*} cpoID the ID of the CPO
         * @param {*} code the code associated with the CPO
         * @returns an object containing the ID of the code, the ID of the CPO, the expiry date of the code and the code itself
         */
        createCPOVerificationCode: async (cpoID, code) => {
            const res = await pool.query("INSERT INTO CPO_CODE(cpo_id,expiry_date,code) VALUES($1, NOW() + INTERVAL '120 SECONDS', $2) RETURNING *", [cpoID, code]);
            const row = res.rows[0]
            return row ? { id: row.id, cpoID: row.cpo_id, expiryDate: new Date(row.expiry_date), code: row.code } : undefined
        },

        /**
         * Check if the code for the verification of a CPO is valid
         * @param {*} cpoID the ID of the CPO
         * @returns the code, the expiry date and the email of the CPO if the code is valid, undefined otherwise
         */
        checkCPOVerificationCode: async (cpoID) => {
            const res = await pool.query('SELECT * FROM CPO_CODE AS CC, CPO AS C WHERE CC.cpo_id = C.id AND CC.cpo_id = $1', [cpoID])
            const row = res.rows[0]
            return row ? { code: row.code, expiryDate: new Date(row.expiry_date), email: row.email } : undefined
        },

        /**
         * Check if the code for the verification of a driver is valid
         * @param {*} driverID the ID of the driver
         * @returns the code, the expiry date and the phone number of the driver if the code is valid, undefined otherwise
         */
        checkDriverVerificationCode: async (driverID) => {
            const res = await pool.query('SELECT * FROM DRIVER_CODE AS DC, DRIVER AS D WHERE DC.driver_id = D.id AND DC.driver_id = $1', [driverID])
            const row = res.rows[0]
            return row ? { code: row.code, expiryDate: new Date(row.expiry_date), phoneNumber: row.phone } : undefined
        },

        /**
         * Update the code for the verification of a driver
         * @param {*} driverID the ID of the driver
         * @param {*} newPin the new code
         * @returns true
         */
        updateDriverCode: async (driverID, newPin) => {
            const res = pool.query('UPDATE DRIVER_CODE SET code = $1 WHERE driver_id = $2', [newPin, driverID])
            return true
        },

        /**
         * Update the code for the verification of a CPO
         * @param {*} cpoID the ID of the CPO
         * @param {*} newPin the new code
         * @returns true
         */
        updateCPOCode: async (cpoID, newPin) => {
            const res = pool.query('UPDATE CPO_CODE SET code = $1 WHERE cpo_id = $2', [newPin, cpoID])
            return true
        },

        /**
         * Delete the code for the verification of a driver
         * @param {*} driverID the ID of the driver
         * @returns true
         */
        deleteDriverCode: async (driverID) => {
            await pool.query('DELETE FROM DRIVER_CODE WHERE driver_id = $1', [driverID])
            return true
        },

        /**
         * Delete the code for the verification of a CPO
         * @param {*} cpoID the ID of the CPO
         * @returns true
         */
        deleteCPOCode: async (cpoID) => {
            await pool.query('DELETE FROM CPO_CODE WHERE cpo_id = $1', [cpoID])
            return true
        },

        /**
         * Delete a driver
         * @param {*} driverID the ID of the driver
         * @returns true
         */
        deleteDriver: async (driverID) => {
            await pool.query('DELETE FROM DRIVER_CODE WHERE driver_id = $1', [driverID])
            await pool.query('DELETE FROM DRIVER WHERE id = $1', [driverID])
            return true
        },

        /**
         * Delete a CPO
         * @param {*} cpoID the ID of the CPO
         * @returns true
         */
        deleteCPO: async (cpoID) => {
            await pool.query('DELETE FROM CPO_CODE WHERE cpo_id = $1', [cpoID])
            await pool.query('DELETE FROM CPO WHERE id = $1', [cpoID])
            return true
        },

        /**
         * Get the EVCPs in a range of 50km from a given position
         * @param {*} latitude the latitude of the position
         * @param {*} longitude the longitude of the position
         * @param {*} filters the filters to apply
         * @returns the EVCPs in a range of 50km from a given position filtered by the given filters
         */
        getEVCPs: async (latitude, longitude, filters) => {
            // TODO check FILTERS: how do they are defined?
            const res = await pool.query('SELECT * FROM EVCP')
            const rows = res.rows.filter(row => distance(row.latitude, row.longitude, latitude, longitude) <= 50) // return the EVCP in a km range
            return rows ? rows.map((row) => ({ evcpID: row.id, latitude: row.latitude, longitude: row.longitude })) : undefined
        },

        /**
         * Get the EVCPs of a CPO
         * @param {*} cpoID the ID of the CPO
         * @returns the EVCPs of a CPO
         */
        getEVCPsByCPO: async (cpoID) => {
            const res = await pool.query('SELECT * FROM EVCP WHERE cpo_id = $1', [cpoID])
            const rows = res.rows
            return rows ? rows.map((row) => ({ evcpID: row.id, name: row.name })) : undefined
        },

        /**
         * Get detailed information about an EVCP (it is intended to be used by the CPO)
         * @param {*} evcpID the ID of the EVCP
         * @returns the detailed information about an EVCP
         */
        getSpecificEVCP: async (evcpID) => {
            const res = await pool.query('SELECT * FROM EVCP AS E JOIN CP ON CP.evcp_id = E.id JOIN SOCKET AS S ON S.cp_id = CP.id WHERE E.id = $1', [evcpID])
            const rows = res.rows
            return rows
        },

        /**
         * Get a detailed view of an EVCP (it is intended to be used by the driver)
         * @param {*} evcpID the ID of the EVCP
         * @returns the detailed view of an EVCP
         */
        getDetailsEVCP: async (evcpID) => {
            const firstQuery = await pool.query('SELECT C.company_name, E.address FROM EVCP AS E, CPO AS C WHERE E.cpo_id = C.id AND E.id = $1', [evcpID])
            const rows1 = firstQuery.rows[0];
            if (!rows1) return
            const secondQuery = await pool.query(dedent`SELECT DISTINCT T.type_name, TYPE_FREE.number AS "free", TYPE_TOTAL.number AS "total", R.flatprice, R.variableprice, S.power_kW
                                                        FROM EVCP AS E
                                                        JOIN CP ON E.id = CP.evcp_id
                                                        JOIN Socket AS S ON CP.id = S.cp_id
                                                        JOIN Type AS T ON S.type_id = T.id
                                                        JOIN TYPE_FREE ON T.id = TYPE_FREE.id AND TYPE_FREE.power_kW = S.power_kW
                                                        JOIN TYPE_TOTAL ON T.id = TYPE_TOTAL.id AND TYPE_TOTAL.power_kW = S.power_kW
                                                        JOIN Rate AS R ON R.evcp_id = E.id
                                                        WHERE E.id = $1 AND R.type_id = T.id AND TYPE_FREE.evcp_id = E.id AND TYPE_TOTAL.evcp_id = E.id`, [evcpID])
            const rows2 = secondQuery.rows.map((row) => ({ typeName: row.type_name, freeSpots: row.free, totalSpots: row.total, flatPrice: row.flatprice, variablePrice: row.variableprice, power: row.power_kw }))
            return rows2 ? { companyName: rows1.company_name, address: rows1.address, evcpID: evcpID, connectors: rows2 } : undefined
        },

        /**
         * Check the available reservation slots for a given EVCP, type, power and start date
         * @param {*} id the ID of the EVCP
         * @param {*} type the type of the connector
         * @param {*} power the power of the connector
         * @param {*} date the start date of the reservation
         * @returns the slots available for the given EVCP, type, power and start date
         */
        checkReservationSlots: async (id, type, power, date) => {
            const day = standardize(date)


            const res1 = await pool.query(dedent`SELECT *
                                                 FROM RESERVATION AS R
                                                 JOIN SOCKET AS S ON S.id = R.socket_id
                                                 JOIN CP ON CP.id = S.cp_id
                                                 JOIN EVCP AS E ON E.id = CP.evcp_id
                                                 JOIN TYPE AS T ON T.id = S.type_id
                                                 WHERE R.start_date <= $1 AND R.end_date >= $1 AND E.id = $2 AND T.type_name = $3 AND S.power_kW = $4`, [day, id, type, power])

            let today = new Date(day)
            let tomorrow = new Date(today.getTime() + (29 * 60 * 60 * 1000))

            const res = await pool.query(dedent`SELECT *
                                                FROM RESERVATION AS R
                                                JOIN SOCKET AS S ON S.id = R.socket_id
                                                JOIN CP ON CP.id = S.cp_id
                                                JOIN EVCP AS E ON E.id = CP.evcp_id
                                                JOIN TYPE AS T ON T.id = S.type_id
                                                WHERE R.start_date >= $1 AND R.end_date <= $2 AND E.id = $3 AND T.type_name = $4 AND S.power_kW = $5
                                                ORDER BY R.start_date`, [today, tomorrow, id, type, power])

            let first = res1.rowCount > 0 ? res1.rows[0].end_date : day
            const queue = res.rows.filter(row => new Date(row.start_date) > new Date(day)).reverse()
            const slots = []
            while (queue.length > 0 && new Date(first) < tomorrow) {
                const nextFirst = queue.pop()
                if (String(first).valueOf() !== String(nextFirst.start_date).valueOf()) {

                    slots.push({ from: standardize(first), to: standardize(nextFirst.start_date) })
                }

                first = nextFirst.end_date
            }
            if (new Date(first) < tomorrow) {
                slots.push({ from: standardize(first), to: standardize(tomorrow) })
            }
            return slots
        },

        /**
         * Check the maximum duration of a reservation for a given EVCP, type, power and start date
         * @param {*} id the ID of the EVCP
         * @param {*} type the type of the connector
         * @param {*} power the power of the connector
         * @param {*} timeFrom the start date of the reservation
         * @returns an object with the maximum duration of the reservation
         */
        checkMaxDuration: async (id, type, power, timeFrom) => {
            const from = standardize(timeFrom)
            const res1 = await pool.query(dedent`SELECT R.id
                                                 FROM RESERVATION AS R
                                                 JOIN SOCKET AS S ON R.socket_id = S.id
                                                 JOIN CP ON S.cp_id = CP.id
                                                 JOIN EVCP AS E ON CP.evcp_id = E.id
                                                 JOIN TYPE AS T ON S.type_id = T.id
                                                 WHERE E.id = $1 AND T.type_name = $2 AND S.power_kW = $3 AND R.start_date <= $4 AND R.end_date > $4`, [id, type, power, from])
            if (res1.rowCount > 0) return { inf: false }
            const res2 = await pool.query(dedent`SELECT MIN(R.start_date - $4) AS max_duration
                                                FROM RESERVATION AS R
                                                JOIN SOCKET AS S ON R.socket_id = S.id
                                                JOIN CP ON S.cp_id = CP.id
                                                JOIN EVCP AS E ON CP.evcp_id = E.id
                                                JOIN TYPE AS T ON S.type_id = T.id
                                                WHERE E.id = $1 AND T.type_name = $2 AND S.power_kW = $3 AND R.start_date >= $4`, [id, type, power, from])
            const row = res2.rows[0]
            return row && row.max_duration ? { maxDuration: row.max_duration, inf: false } : { inf: true }
        },

        /**
         * Check the availability of a socket for a given EVCP, type, power, start date and end date
         * @param {*} evcpID the ID of the EVCP
         * @param {*} type the type of the connector
         * @param {*} power the power of the connector
         * @param {*} timeFrom the start date of the reservation
         * @param {*} timeTo the end date of the reservation
         * @returns an object with the ID of a socket available for the given EVCP, type, power, start date and end date
         */
        checkAvailability: async (evcpID, type, power, timeFrom, timeTo) => {
            const from = standardize(timeFrom)
            const to = standardize(timeTo)
            const res = await pool.query(dedent`SELECT S.id
                                                FROM SOCKET AS S
                                                JOIN CP ON CP.id = S.cp_id
                                                JOIN EVCP AS E ON CP.evcp_id = E.id
                                                JOIN TYPE AS T ON S.type_id = T.id
                                                WHERE E.id = $1 AND type_name = $2 AND S.power_kW = $3
                                                AND S.id NOT IN
                                                    (SELECT R.socket_id
                                                     FROM RESERVATION AS R
                                                     WHERE R.start_date < $4 AND R.end_date > $5
                                                    )`, [evcpID, type, power, from, to])
            const rows = res.rows
            return rows.length > 0 ? { socketID: rows[0].id } : undefined
        },

        /**
         * Add a reservation for a given EVCP, type, power, start date and end date
         * @param {*} driverID the ID of the driver
         * @param {*} socketID the ID of the socket
         * @param {*} timeFrom the start date of the reservation
         * @param {*} timeTo the end date of the reservation
         * @returns true
         */
        addReservation: async (driverID, socketID, timeFrom, timeTo) => {
            const from = standardize(timeFrom)
            const to = standardize(timeTo)
            const res = await pool.query('INSERT INTO RESERVATION(driver_id, socket_id, start_date, end_date) VALUES($1, $2, $3, $4)', [driverID, socketID, from, to])
            return true
        },

        /**
         * Get aggregated data for a given CPO (profit and energy spent)
         * @param {*} cpoID the ID of the CPO
         * @returns the aggregated data for a given CPO (profit and energy spent)
         */
        aggregateCPOData: async (cpoID) => {
            const res = await pool.query(dedent`SELECT E.id, R.start_date, SUM(R.total_price) AS profit, SUM(R.charged_kwh) AS energy FROM RESERVATION AS R JOIN SOCKET AS S ON R.socket_id = S.id JOIN CP ON S.cp_id = CP.id JOIN EVCP AS E ON E.id = CP.evcp_id JOIN CPO ON E.cpo_id = CPO.id WHERE CPO.id = $1 GROUP BY E.id, R.start_date`, [cpoID])
            const rows = res.rows
            return rows ? rows.map((row) => ({ evcpID: row.id, date: row.start_date, profit: row.profit, energy: row.energy })) : []
        },

        /**
         * Find the socket ID for a given reservation ID
         * @param {*} reservationID the ID of the reservation
         * @returns the socket ID for a given reservation ID
         */
        findSocket: async (reservationID) => {
            const res = await pool.query('SELECT socket_id FROM RESERVATION WHERE id = $1', [reservationID])
            const rows = res.rows
            return res.rowCount > 0 ? rows[0].socket_id : undefined
        },

        /**
         * Get the reservations associated with a given driver
         * @param {*} driverID the ID of the driver
         * @returns the reservations associated with a given driver
         */
        getDriverReservations: async (driverID) => {
            const res = await pool.query(dedent`SELECT C.company_name, E.address, R.start_date, R.end_date, T.type_name, S.power_kw, R.total_price, R.charged_kwh, R.discount_percent, R.id
                                                FROM RESERVATION AS R
                                                JOIN SOCKET AS S ON S.id = R.socket_id
                                                JOIN CP ON CP.id = S.cp_id
                                                JOIN EVCP AS E ON E.id = CP.evcp_id
                                                JOIN TYPE AS T ON T.id = S.type_id
                                                JOIN CPO AS C ON C.id = E.cpo_id
                                                WHERE R.driver_id = $1`, [driverID])
            const rows = res.rows.map((row) => ({ cpo: row.company_name, address: row.address, timeFrom: row.start_date, timeTo: row.end_date, connectorTypeName: row.type_name, connectorPower: row.power_kw, discount: row.discount_percent, totalPrice: row.total_price, chargedkWh: row.charged_kwh, reservationID: row.id }))
            return rows
        },

        /**
         * Update the notification token for a given driver
         * @param {*} driverID the ID of the driver
         * @param {*} messagingToken the messaging token
         * @returns true
         */
        updateNotificationToken: async (driverID, messagingToken) => {
            const res = await pool.query('UPDATE DRIVER SET notification_token = $1 WHERE id = $2', [messagingToken, driverID])
            return true
        },

        /**
         * Select the reservations associated with a given EVCP
         * @param {*} evcpID the ID of the EVCP
         * @returns the reservations associated with a given EVCP
         */
        getCPOReservations: async (evcpID) => {
            const res = await pool.query(dedent`SELECT * FROM RESERVATION AS R JOIN SOCKET AS S ON S.id = R.socket_id JOIN CP ON CP.id = S.cp_id JOIN EVCP AS E ON E.id = CP.evcp_id
                                                WHERE E.id = $1`, [evcpID])
            const rows = res.rows
            return rows ? rows.map((row) => ({ reservationID: row.id, driverID: row.driver_id, socketID: row.socket_id, timeFrom: row.start_date, timeTo: row.end_date, totalPrice: row.total_price, chargedkWh: row.charged_kwh, discount: row.discount_percent })) : []
        },

        /**
         * Add a new EVCP
         * @param {*} cpoID the ID of the CPO that owns the EVCP
         * @param {*} name the name of the EVCP
         * @param {*} latitude the latitude of the EVCP
         * @param {*} longitude the longitude of the EVCP
         * @param {*} address the address of the EVCP
         * @returns true if the EVCP was added, false otherwise
         */
        addEVCP: async (cpoID, name, latitude, longitude, address) => {
            const res = await pool.query('INSERT INTO EVCP(name, cpo_id, latitude, longitude, address) VALUES($1, $2, $3, $4, $5) RETURNING *', [name, cpoID, latitude, longitude, address])
            return res.rowCount > 0
        },

        /**
         * Add a new CP
         * @param {*} evcpID the ID of the EVCP that owns the CP
         * @returns true if the CP was added, false otherwise
         */
        addCP: async (evcpID) => {
            const res = await pool.query('INSERT INTO CP(evcp_id, is_active) VALUES($1, FALSE) RETURNING *', [evcpID])
            return res.rowCount > 0
        },

        /**
         * Add a new socket
         * @param {*} cpID the ID of the CP that owns the socket
         * @param {*} power the power of the socket
         * @param {*} type the type of the socket
         * @returns true if the socket was added, false otherwise
         */
        addSocket: async (cpID, power, type) => {
            const firstQuery = await pool.query('SELECT id FROM TYPE WHERE type_name = $1', [type])
            const row1 = firstQuery.rows[0]
            if (!row1) return false
            const secondQuery = await pool.query('INSERT INTO SOCKET(cp_id, power_kW, type_id) VALUES($1, $2, $3)', [cpID, power, row1.id])
            return secondQuery.rowCount > 0
        },

        /**
         * Add a new rate for a specific EVCP
         * @param {*} evcpID the ID of the EVCP
         * @param {*} typeName the name of the socket type the rate is for
         * @param {*} flatPrice the flat price of the rate (per hour)
         * @param {*} variablePrice the variable price of the rate (per kWh)
         * @returns true if the rate was added, false otherwise
         */
        addRate: async (evcpID, typeName, flatPrice, variablePrice) => {
            const firstQuery = await pool.query('SELECT id FROM TYPE WHERE type_name = $1', [typeName])
            const row1 = firstQuery.rows[0]
            if (!row1) return false
            const res = await pool.query('INSERT INTO RATE(evcp_id, type_id, flatPrice, variablePrice) VALUES ($1, $2, $3, $4) RETURNING *', [evcpID, row1.id, flatPrice, variablePrice])
            return res
        },

        /**
         * Get the rates for a specific EVCP
         * @param {*} evcpID the ID of the EVCP
         * @returns the rates for a specific EVCP
         */
        getRate: async (evcpID) => {
            const res = await pool.query('SELECT * FROM RATE AS R JOIN  TYPE AS T ON T.id = R.type_id WHERE R.evcp_id = $1', [evcpID])
            const rows = res.rows
            return rows ? rows.map((row) => ({ typeName: row.type_name, flatPrice: row.flat_price, variablePrice: row.variable_price })) : []
        },

        /**
         * Add a new special offer for a specific EVCP
         * @param {*} evcpID the ID of the EVCP
         * @param {*} discount the percentage of the discount
         * @param {*} timeframe the timeframe of the special offer
         * @returns true
         */
        addSpecialOffer: async (evcpID, discount, timeframe) => {
            const res = await pool.query('INSERT INTO SPECIAL_OFFER(discount, time_frame, evcp_id) VALUES($1, $2, $3)', [discount, timeframe, evcpID])
            return true // if ok, or false?
        },

        /**
         * Get the DSO information for a specific EVCP
         * @param {*} evcpID the ID of the EVCP
         * @returns an object containing the DSO name, price and contract expiry
         */
        getDSO: async (evcpID) => {
            const res = await pool.query('SELECT DSO_name, DSO_pricekW, DSO_contract_expiry FROM EVCP WHERE id = $1', [evcpID])
            const rows = res.rows
            return rows[0] ? { DSOname: rows[0].dso_name, DSOprice: rows[0].dso_pricekw, DSOexpiry: rows[0].dso_contract_expiry } : []
        },

        /**
         * Update the DSO for a specific EVCP
         * @param {*} evcpID the ID of the EVCP
         * @param {*} DSO_name the name of the DSO
         * @param {*} DSO_pricekW the price of the DSO
         * @param {*} DSO_contract_expiry the contract expiry of the DSO
         * @returns true
         */
        updateDSO: async (evcpID, DSO_name, DSO_pricekW, DSO_contract_expiry) => {
            const res = await pool.query('UPDATE EVCP SET DSO_name = $1, DSO_pricekW = $2, DSO_contract_expiry = $3 WHERE id = $4', [DSO_name, DSO_pricekW, DSO_contract_expiry, evcpID])
            return true
        },

        /**
        * This function is used for testing purposes. It executes the callback in a transaction and then cancels it
        * @param {*} callback the callback to execute
        */
        executeAndCancel: async (callback) => {
            const client = await pool.connect()
            try {
                await pool.query('BEGIN')
                await callback()
            } finally {
                await pool.query('ROLLBACK')
                client.release()
            }
        }
    }
}