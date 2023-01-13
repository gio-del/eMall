const pool = require('../db/db')

// pool.query('SELECT * FROM TODO WHERE ID = $1,id)

exports.getQueryManager = async () => {
    return {
        /**
         * @param {*} phoneNumber the phone to check
         * @returns true if already exists, false otherwise
         */
        checkIfAlreadyExist: async (phoneNumber) => {
            const res = await pool.query('SELECT * FROM driver WHERE phone=$1', [phoneNumber])
            return res.rowCount > 0
        },
        createDriver: async (firstName, lastName, password, phoneNumber) => {
            // todo add crypt()
            const res = await pool.query('INSERT INTO driver(first_name, last_name, password, phone) VALUES($1,$2,$3,$4)', [firstName, lastName, password, phoneNumber])
            return true
        },

        checkDriverCredentials: async (phoneNumber, password) => {
            return true
        },

        createDriverVerificationCode: async (phoneNumber, code) => {
            const res = await pool.query('INSERT INTO ')
            return true
        },

        checkVerificationCode: async (phoneNumber, code) => {
            return true
        },

        createDriverToken: async (phoneNumber, token) => {
            return true
        },

        getCPs: async (latitude, longitude, filters) => {
            return true
        },

        checkAvailability: async (reservationParam) => {
            return true
        },

        addReservation: async (reservationParam) => {
            return true
        },

        removeReservation: async (reservationID) => {
            return true
        },

        findSocket: async (reservationID) => {
            return true
        },

        getReservations: async (userID) => {
            return true
        },

        addCar: async (car, userID, location) => {
            return true
        },
        getUserID: async (carID) => {
            return true
        },
        checkNotificationPreferences: async (userID) => {
            return true
        },
        getReservations: async (cpoID) => {
            return true
        },
        addCP: async (cpID, evcpID, rate) => {
            return true
        },
        activeCP: async (cpID) => {
            return true
        },
        addRate: async (evcpID, flatPrice, variablePrice, powerkWh) => {
            return true
        },
        getCPs: async (evcpID) => {
            return true
        },
        addSpecialOffer: async (evcpID, discount, timeframe) => {
            return true
        },
        verifyCommitmentDate: async (cpoID) => {
            return true
        },
        addContract: async (contract, cpoID) => {
            return true
        },
    }
}