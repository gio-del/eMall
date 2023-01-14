const pool = require('../db/db')
const distance = require('./utils')

// pool.query('SELECT * FROM TODO WHERE ID = $1,[id])

exports.getQueryManager = async () => {
    return {
        /**
         * @param {*} phoneNumber the phone to check
         * @returns true if already exists, false otherwise
         */
        checkIfAlreadyExist: async (phoneNumber) => {
            const res = await pool.query('SELECT * FROM DRIVER WHERE phone=$1', [phoneNumber])
            return res.rowCount > 0
        },
        createDriver: async (firstName, lastName, password, phoneNumber) => {
            const res = await pool.query('INSERT INTO DRIVER(first_name, last_name, password, phone) VALUES($1,$2,$3,$4) RETURNING *', [firstName, lastName, password, phoneNumber])
            return res.rows[0].id
        },

        checkDriverCredentials: async (phoneNumber, password) => {
            // bcrypt or something to check the password for the user, we store only the HASH salted
            return true
        },

        createDriverVerificationCode: async (driverID, code) => {
            const res = await pool.query("INSERT INTO DRIVER_CODE(driver_id,expiry_date,code) VALUES($1, NOW() + INTERVAL '120 SECONDS', $2) RETURNING *", [driverID, code]);
            return res.rows[0]
        },

        checkVerificationCode: async (driverID) => {
            const res = await pool.query('SELECT * FROM DRIVER_CODE AS DC, DRIVER AS D WHERE DC.driver_id = D.id AND driver_id = $1', [driverID])
            return res.rows[0]
        },

        updatePin: async (driverID, newPin) => {
            const res = pool.query('UPDATE DRIVER_CODE SET code = $1 WHERE driver_id = $2', [newPin, driverID])
            return true
        },

        deletePin: async (driverID) => {
            await pool.query('DELETE FROM DRIVER WHERE driver_id = $1', [driverID])
            return true
        },

        deleteUser: async (driverID) => {
            await pool.query('DELETE FROM DRIVER_CODE WHERE driver_id = $1', [driverID])
            await pool.query('DELETE FROM DRIVER WHERE driver_id = $1', [driverID])
            return true
        },



        createDriverToken: async (phoneNumber, token) => {
            // a token to avoid to login every time, so the user provides the token within the request and we silently check the correctness, if not redirect to login component
            return true
        },

        getCPs: async (latitude, longitude, filters) => {
            // TODO check FILTERS: how do they are defined?
            const res = await pool.query('SELECT * FROM EVCP')
            res.rows.filter(row => distance(row.latitude, row.longitude, latitude, longitude) <= 30) // return the EVCP in a 30km range
            return res.rowCount > 0
        },

        checkAvailability: async (reservationParam) => {
            // What reservationParam are?
            return true
        },

        addReservation: async (reservationParam) => {
            // Same as above
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

        getReservations: async (userID) => {
            const res = await pool.query('SELECT * FROM RESERVATION WHERE driver_id = $1', [userID])
            return res.rows // here no problem rows CAN be empty
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
        getReservations: async (cpoID) => {
            const res = await pool.query(`SELECT * FROM RESERVATION AS R, SOCKET AS S, CP, EVCP AS E\
                                          WHERE R.socket_id = S.id AND S.cp_id = CP.id AND CP.evcp_id = E.id AND E.cpo_id = $1`, [cpoID])
            return res.rows
        },
        addCP: async (cpID, evcpID, rate) => {
            // how is RATE defined??
            return true
        },
        activeCP: async (cpID) => {
            // this method is used to retrieve wether the CP is activated or not
            return true
        },
        addRate: async (evcpID, flatPrice, variablePrice, powerkWh) => {
            const res = await pool.query('INSERT INTO RATE(evcp_id, flatPrice, variablePrice, power_kW) VALUES ($1,$2,$3,$4)', [evcpID, flatPrice, variablePrice, powerkWh])
            return true // if ok, or false ??
        },
        getCPs: async (evcpID) => {
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