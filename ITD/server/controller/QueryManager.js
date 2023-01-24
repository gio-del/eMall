const pool = require('../db/db')
const distance = require('./utils')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const dedent = require('dedent')

exports.getQueryManager = async () => {

    const standardize = (date) => {
        const time = new Date(date)
        time.setSeconds(0)
        return time.toUTCString()
    }

    return {
        createDriver: async (firstName, lastName, password, phoneNumber) => {
            const res = await pool.query('INSERT INTO DRIVER(first_name, last_name, password, phone) VALUES($1,$2,$3,$4) RETURNING *', [firstName, lastName, password, phoneNumber])
            return res.rows[0].id
        },
        createCPO: async (companyName, password, email) => {
            const res = await pool.query('INSERT INTO CPO(company_name, password, email) VALUES($1,$2,$3) RETURNING *', [companyName, password, email])
            return res.rows[0].id
        },
        findDriverByPhoneNumber: async (phoneNumber) => {
            const res = await pool.query('SELECT * FROM DRIVER WHERE phone = $1', [phoneNumber])
            const row = res.rows[0]
            return row ? { driverID: row.id } : undefined
        },
        findCPOByEmail: async (email) => {
            const res = await pool.query('SELECT * FROM CPO WHERE email = $1', [email])
            const row = res.rows[0]
            return row ? { cpoID: row.id } : undefined
        },

        checkDriverCredentials: async (phoneNumber, password) => {
            const res = await pool.query('SELECT * FROM DRIVER WHERE phone = $1', [phoneNumber])
            user = res.rows[0]
            return bcrypt.compareSync(password, user.password)
        },

        checkCPOCredentials: async (email, password) => {
            const res = await pool.query('SELECT * FROM CPO WHERE email = $1', [email])
            user = res.rows[0]
            return bcrypt.compareSync(password, user.password)
        },

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

        validateToken: async (token) => {
            const res = await pool.query('SELECT * FROM TOKEN WHERE token = $1', [token])
            const row = res.rows[0]
            return row ? { driverID: row.driver_id, cpoID: row.cpo_id } : undefined
        },

        createDriverVerificationCode: async (driverID, code) => {
            const res = await pool.query("INSERT INTO DRIVER_CODE(driver_id,expiry_date,code) VALUES($1, NOW() + INTERVAL '120 SECONDS', $2) RETURNING *", [driverID, code]);
            const row = res.rows[0]
            return row ? { id: row.id, driverID: row.driver_id, expiryDate: row.expiry_date, code: row.code } : undefined
        },

        createCPOVerificationCode: async (cpoID, code) => {
            const res = await pool.query("INSERT INTO CPO_CODE(cpo_id,expiry_date,code) VALUES($1, NOW() + INTERVAL '120 SECONDS', $2) RETURNING *", [cpoID, code]);
            const row = res.rows[0]
            return row ? { id: row.id, cpoID: row.cpo_id, expiryDate: row.expiry_date, code: row.code } : undefined
        },

        checkCPOVerificationCode: async (cpoID) => {
            const res = await pool.query('SELECT * FROM CPO_CODE AS CC, CPO AS C WHERE CC.cpo_id = C.id AND CC.cpo_id = $1', [cpoID])
            const row = res.rows[0]
            return row ? { code: row.code, expiryDate: new Date(row.expiry_date), email: row.email } : undefined
        },
        checkDriverVerificationCode: async (driverID) => {
            const res = await pool.query('SELECT * FROM DRIVER_CODE AS DC, DRIVER AS D WHERE DC.driver_id = D.id AND DC.driver_id = $1', [driverID])
            const row = res.rows[0]
            return row ? { code: row.code, expiryDate: new Date(row.expiry_date), phoneNumber: row.phone } : undefined
        },

        updateDriverCode: async (driverID, newPin) => {
            const res = pool.query('UPDATE DRIVER_CODE SET code = $1 WHERE driver_id = $2', [newPin, driverID])
            return true
        },
        updateCPOCode: async (cpoID, newPin) => {
            const res = pool.query('UPDATE CPO_CODE SET code = $1 WHERE cpo_id = $2', [newPin, cpoID])
            return true
        },

        deleteDriverCode: async (driverID) => {
            await pool.query('DELETE FROM DRIVER_CODE WHERE driver_id = $1', [driverID])
            return true
        },
        deleteCPOCode: async (cpoID) => {
            await pool.query('DELETE FROM CPO_CODE WHERE cpo_id = $1', [cpoID])
            return true
        },

        deleteDriver: async (driverID) => {
            await pool.query('DELETE FROM DRIVER_CODE WHERE driver_id = $1', [driverID])
            await pool.query('DELETE FROM DRIVER WHERE id = $1', [driverID])
            return true
        },

        deleteCPO: async (cpoID) => {
            await pool.query('DELETE FROM CPO_CODE WHERE cpo_id = $1', [cpoID])
            await pool.query('DELETE FROM CPO WHERE id = $1', [cpoID])
            return true
        },

        getEVCPs: async (latitude, longitude, filters) => {
            // TODO check FILTERS: how do they are defined?
            const res = await pool.query('SELECT * FROM EVCP')
            const rows = res.rows.filter(row => distance(row.latitude, row.longitude, latitude, longitude) <= 50) // return the EVCP in a km range
            return rows ? rows.map((row) => ({ evcpID: row.id, latitude: row.latitude, longitude: row.longitude })) : undefined
        },

        getEVCPsByCPO: async (cpoID) => {
            const res = await pool.query('SELECT * FROM EVCP WHERE cpo_id = $1', [cpoID])
            return rows ? rows.map((row) => ({ evcpID: row.id, name: row.name })) : undefined
        },

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

        checkReservationSlots: async (id, type, power, date) => {
            const day = standardize(date)
            console.log('date (standardized): ', day)

            const res1 = await pool.query(dedent`SELECT *
                                                 FROM RESERVATION AS R
                                                 JOIN SOCKET AS S ON S.id = R.socket_id
                                                 JOIN CP ON CP.id = S.cp_id
                                                 JOIN EVCP AS E ON E.id = CP.evcp_id
                                                 JOIN TYPE AS T ON T.id = S.type_id
                                                 WHERE R.start_date <= $1 AND R.end_date >= $1 AND E.id = $2 AND T.type_name = $3 AND S.power_kW = $4`, [day, id, type, power])
            console.log('RES1:', res1.rows)
            let today = new Date(day)
            let tomorrow = new Date(today.getTime() + (29 * 60 * 60 * 1000))
            console.log('today:', today)
            console.log('tomorrow:', tomorrow)
            const res = await pool.query(dedent`SELECT *
                                                FROM RESERVATION AS R
                                                JOIN SOCKET AS S ON S.id = R.socket_id
                                                JOIN CP ON CP.id = S.cp_id
                                                JOIN EVCP AS E ON E.id = CP.evcp_id
                                                JOIN TYPE AS T ON T.id = S.type_id
                                                WHERE R.start_date >= $1 AND R.end_date <= $2 AND E.id = $3 AND T.type_name = $4 AND S.power_kW = $5
                                                ORDER BY R.start_date`, [today, tomorrow, id, type, power])
            console.log('RES2:', res.rows)
            let first = res1.rowCount > 0 ? res1.rows[0].end_date : day
            const queue = res.rows.filter(row => new Date(row.start_date) > new Date(day)).reverse()
            const slots = []
            while (queue.length > 0 && new Date(first) < tomorrow) {
                const nextFirst = queue.pop()
                if (String(first).valueOf() !== String(nextFirst.start_date).valueOf()) {
                    console.log('first', first, '!===', 'nextFirst.start_date', nextFirst.start_date)
                    slots.push({ from: standardize(first), to: standardize(nextFirst.start_date) })
                }

                first = nextFirst.end_date
            }
            if (new Date(first) < tomorrow) {
                slots.push({ from: standardize(first), to: standardize(tomorrow) })
            }
            return slots
        },

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

        addReservation: async (driverID, socketID, timeFrom, timeTo) => {
            const from = standardize(timeFrom)
            const to = standardize(timeTo)
            const res = await pool.query('INSERT INTO RESERVATION(driver_id, socket_id, start_date, end_date) VALUES($1, $2, $3, $4)', [driverID, socketID, from, to])
            return true
        },

        removeReservation: async (reservationID) => {
            const res = await pool.query('DELETE FROM RESERVATION WHERE id = $1', [reservationID])
            return true // true if ok, or false ?
        },

        findSocket: async (reservationID) => {
            const res = await pool.query('SELECT socket_id FROM RESERVATION WHERE id = $1', [reservationID])
            return res.rows[0] //id is unique so this is ok, but what if there is no  reservation with the provided id?
        },

        getDriverReservations: async (driverID) => {
            const res = await pool.query(dedent`SELECT C.company_name, E.address, R.start_date, R.end_date, T.type_name, S.power_kw, R.total_price, R.charged_kwh, R.discount_percent
                                                FROM RESERVATION AS R
                                                JOIN SOCKET AS S ON S.id = R.socket_id
                                                JOIN CP ON CP.id = S.cp_id
                                                JOIN EVCP AS E ON E.id = CP.evcp_id
                                                JOIN TYPE AS T ON T.id = S.type_id
                                                JOIN CPO AS C ON C.id = E.cpo_id
                                                WHERE R.driver_id = $1`, [driverID])
            const rows = res.rows.map((row) => ({ cpo: row.company_name, address: row.address, timeFrom: row.start_date, timeTo: row.end_date, connectorTypeName: row.type_name, connectorPower: row.power_kw, discount: row.discount_percent, totalPrice: row.total_price, chargedkWh: row.charged_kwh }))
            return rows
        },

        addCar: async (car, userID, location) => {
            // i dont know what car is, maybe an object but is better if who calls this methods provide the 'unpacked' version
            return true
        },

        getUserID: async (carID) => {
            // what is this method used for?? i think for suggestion because the suggestion manager needs to know who has a car discharged
            return true
        },

        updateNotificationToken: async (driverID, messagingToken) => {
            const res = await pool.query('UPDATE DRIVER SET notification_token = $1 WHERE id = $2', [messagingToken, driverID])
            return true
        },

        getCPOReservations: async (cpoID) => {
            const res = await pool.query(`SELECT * FROM RESERVATION AS R, SOCKET AS S, CP, EVCP AS E\
                                          WHERE R.socket_id = S.id AND S.cp_id = CP.id AND CP.evcp_id = E.id AND E.cpo_id = $1`, [cpoID])
            return res.rows
        },

        addEVCP: async (cpoID, name, latitude, longitude, address) => {
            const res = await pool.query('INSERT INTO EVCP(name, cpo_id, latitude, longitude, address) VALUES($1, $2, $3, $4, $5) RETURNING *', [name, cpoID, latitude, longitude, address])
            return res.rowCount > 0
        },

        addCP: async (evcpID) => {
            const res = await pool.query('INSERT INTO CP(evcp_id, is_active) VALUES($1, FALSE) RETURNING *', [evcpID])
            return res.rowCount > 0
        },

        activeCP: async (cpID) => {
            // this method is used to retrieve whether the CP is activated or not
            return true
        },

        addSocket: async (cpID, power, type) => {
            const firstQuery = await pool.query('SELECT id FROM TYPE WHERE type_name = $1', [type])
            const row1 = firstQuery.rows[0]
            if (!row1) return
            const secondQuery = await pool.query('INSERT INTO SOCKET(cp_id, power_kW, type_id) VALUES($1, $2, $3)', [cpID, power, row1.id])
            return secondQuery.rowCount > 0
        },

        addRate: async (evcpID, flatPrice, variablePrice, powerkWh) => {
            const res = await pool.query('INSERT INTO RATE(evcp_id, flatPrice, variablePrice, power_kW) VALUES ($1,$2,$3,$4)', [evcpID, flatPrice, variablePrice, powerkWh])
            return true // if ok, or false ??
        },

        findCPsByEVCP: async (evcpID) => {
            // what is this used for??
            const res = await pool.query('SELECT * FROM CP WHERE evcp_id = $1', [evcpID])
            return res.rows
        },
        addSpecialOffer: async (evcpID, discount, timeframe) => {
            const res = await pool.query('INSERT INTO SPECIAL_OFFER(discount, time_frame, evcp_id) VALUES($1, $2, $3)', [discount, timeframe, evcpID])
            return true // if ok, or false?
        },
        verifyCommitmentDate: async (cpoID) => {
            // wrong parameters: a cpo can have multiple evcp each with a different commitment Date
            // const res = await pool.query('SELECT DSO_contract_expiry FROM EVCP WHERE id = $1,[cpoID])
            // return res.rows[0] // what if rows is empty?
            return true
        },
        addContract: async (contract, cpoID) => {
            // Contract should be an obj with DSO_name, DSO_pricekW, DSO_contract_expiry. Also cpoID is not ok since as above...
            //const res = await pool.query(`UPDATE EVCP\
            //                             SET DSO_name = $1, DSO_pricekW = $2, DSO_contract_expiry = $3`,[.........])
            return true
        },

        checkReservationsEnded: async () => {
            const res = await pool.query(`SELECT id, notification_token FROM RESERVATION AS R JOIN DRIVER AS D ON D.id = R.driver_id WHERE R.end_date <= NOW() AND R.notified = false`)
            const rows = res.rows
            for (const row of rows) {
                await pool.query('UPDATE RESERVATION SET notified = true WHERE id = $1', [row.id])
            }
            return rows ? rows.map((row) => { notificationToken: row.notification_token }) : undefined
        }
    }
}