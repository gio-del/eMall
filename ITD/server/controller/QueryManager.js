const pool = require('../db/db')
const distance = require('./utils')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const dedent = require('dedent')

exports.getQueryManager = async () => {
    return {
        createDriver: async (firstName, lastName, password, phoneNumber) => {
            const res = await pool.query('INSERT INTO DRIVER(first_name, last_name, password, phone) VALUES($1,$2,$3,$4) RETURNING *', [firstName, lastName, password, phoneNumber])
            return res.rows[0].id
        },

        findDriverByPhoneNumber: async (phoneNumber) => {
            const res = await pool.query('SELECT * FROM DRIVER WHERE phone = $1', [phoneNumber])
            const row = res.rows[0]
            return row ? { driverID: row.id } : undefined
        },

        checkDriverCredentials: async (phoneNumber, password) => {
            const res = await pool.query('SELECT * FROM DRIVER WHERE phone = $1', [phoneNumber])
            user = res.rows[0]
            return bcrypt.compareSync(password, user.password)
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
            const res = await pool.query('SELECT driver_id FROM TOKEN WHERE token = $1', [token])
            const row = res.rows[0]
            return row ? { driverID: row.driver_id } : undefined
        },

        createDriverVerificationCode: async (driverID, code) => {
            const res = await pool.query("INSERT INTO DRIVER_CODE(driver_id,expiry_date,code) VALUES($1, NOW() + INTERVAL '120 SECONDS', $2) RETURNING *", [driverID, code]);
            const row = res.rows[0]
            return row ? { id: row.id, driverID: row.driver_id, expiryDate: row.expiry_date, code: row.code } : undefined
        },

        checkVerificationCode: async (driverID) => {
            const res = await pool.query('SELECT * FROM DRIVER_CODE AS DC, DRIVER AS D WHERE DC.driver_id = D.id AND DC.driver_id = $1', [driverID])
            const row = res.rows[0]
            return row ? { code: row.code, expiryDate: row.expiry_date, phoneNumber: row.phone } : undefined
        },

        updatePin: async (driverID, newPin) => {
            const res = pool.query('UPDATE DRIVER_CODE SET code = $1 WHERE driver_id = $2', [newPin, driverID])
            return true
        },

        deletePin: async (driverID) => {
            await pool.query('DELETE FROM DRIVER_CODE WHERE driver_id = $1', [driverID])
            return true
        },

        deleteUser: async (driverID) => {
            await pool.query('DELETE FROM DRIVER_CODE WHERE driver_id = $1', [driverID])
            await pool.query('DELETE FROM DRIVER WHERE id = $1', [driverID])
            return true
        },

        getEVCPs: async (latitude, longitude, filters) => {
            // TODO check FILTERS: how do they are defined?
            const res = await pool.query('SELECT * FROM EVCP')
            const rows = res.rows.filter(row => distance(row.latitude, row.longitude, latitude, longitude) <= 50) // return the EVCP in a km range
            return rows ? rows.map((row) => ({ evcpID: row.id, latitude: row.latitude, longitude: row.longitude })) : undefined
        },

        getDetailsEVCP: async (evcpID) => {
            const firstQuery = await pool.query('SELECT C.company_name, E.address FROM EVCP AS E, CPO AS C WHERE E.cpo_id = C.id AND E.id = $1', [evcpID])
            const rows1 = firstQuery.rows[0];
            if (!rows1) return
            const secondQuery = await pool.query(dedent`SELECT DISTINCT T.type_name, S.id, TYPE_FREE.number AS "free", TYPE_TOTAL.number AS "total", R.flatprice, R.variableprice, S.power_kW
                                                        FROM EVCP AS E
                                                        JOIN CP ON E.id = CP.evcp_id
                                                        JOIN Socket AS S ON CP.id = S.cp_id
                                                        JOIN Type AS T ON S.type_id = T.id
                                                        JOIN TYPE_FREE ON T.id = TYPE_FREE.id
                                                        JOIN TYPE_TOTAL ON T.id = TYPE_TOTAL.id
                                                        JOIN Rate AS R ON R.evcp_id = E.id
                                                        WHERE E.id = $1 AND R.type_id = T.id AND TYPE_FREE.evcp_id = E.id AND TYPE_TOTAL.evcp_id = E.id`, [evcpID])
            const rows2 = secondQuery.rows.map((row) => ({ typeName: row.type_name, socketID: row.id, freeSpots: row.free, totalSpots: row.total, flatPrice: row.flatprice, variablePrice: row.variableprice, power: row.power_kw }))
            return rows2 ? { companyName: rows1.company_name, address: rows1.address, evcpID: evcpID, connectors: rows2 } : undefined
        },

        checkAvailability: async (evcpID, type, power, timeFrom, timeTo) => {
            const res = await pool.query(dedent`SELECT S.id
                                                FROM SOCKET AS S
                                                JOIN CP ON CP.id = S.cp_id
                                                JOIN EVCP AS E ON CP.evcp_id = E.id
                                                JOIN TYPE AS T ON S.type_id = T.id
                                                WHERE E.id = $1 AND type_name = $2 AND S.power_kW = $3
                                                AND socket_id NOT IN
                                                    (SELECT R.socket_id
                                                     FROM RESERVATION AS R
                                                     WHERE R.start_date < $4 AND R.end_date > $5
                                                    )`, [evcpID, type, power, timeFrom, timeTo])
            const rows = res.rows
            return rows ? { socketID: rows.id } : undefined
        },

        addReservation: async (driverID, socketID, timeFrom, timeTo) => {
            const res = await pool.query('INSERT INTO RESERVATION(driver_id, socket_id, start_date, end_date) VALUES($1, $2, $3, $4)', [driverID, socketID, timeFrom, timeTo])
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
            const res = await pool.query('SELECT * FROM RESERVATION WHERE driver_id = $1', [driverID])
            const rows = res.rows.map((row) => ({ timeFrom: row.start_date, timeTo: row.end_date, discount: row.discount_percent, driverID: row.driver_id, totalPrice: row.total_price, socketID: row.socket_id, chargedKWh: row.chargedKWh }))
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
        checkNotificationPreferences: async (userID) => {
            const res = await pool.query('SELECT notification_preferences FROM DRIVER WHERE id = $1', [userID])
            return res.rows[0] // this is ok since notification_preferences is a boolean
        },
        getCPOReservations: async (cpoID) => {
            const res = await pool.query(`SELECT * FROM RESERVATION AS R, SOCKET AS S, CP, EVCP AS E\
                                          WHERE R.socket_id = S.id AND S.cp_id = CP.id AND CP.evcp_id = E.id AND E.cpo_id = $1`, [cpoID])
            return res.rows
        },
        addCP: async (cpID, evcpID, rate) => {
            // how is RATE defined??
            return true
        },
        activeCP: async (cpID) => {
            // this method is used to retrieve whether the CP is activated or not
            return true
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
    }
}