const queryManager = require('../QueryManager')
const router = require('express').Router()
const { authenticate } = require('./AccountManager')

/**
 * This route is used to book a socket
 * @param {*} driverID the ID of the driver
 * @param {*} evcpID the ID of the EVCP
 * @param {*} type the type of socket
 * @param {*} power the power of the socket
 * @param {*} timeFrom the time from which the socket is booked
 * @param {*} timeTo the time to which the socket is booked
 * @returns true if the socket is booked, false otherwise
 */
const book = async (driverID, evcpID, type, power, timeFrom, timeTo) => {
    const queryManagerInterface = await queryManager.getQueryManager()
    const available = await queryManagerInterface.checkAvailability(evcpID, type, power, timeFrom, timeTo)
    if (available) {
        return await queryManagerInterface.addReservation(driverID, available.socketID, timeFrom, timeTo)
    }
    return false
}

/**
 * This route is used to see the reservations of a specific EVCP
 */
router.get('/:evcpID', async (req, res) => {
    const { evcpID } = req.params
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        const queryManagerInterface = await queryManager.getQueryManager()
        if (user && queryManagerInterface.verifyEVCPAssociation(user, evcpID)) {
            const reservations = await queryManagerInterface.getCPOReservations(evcpID)
            return res.status(200).json(reservations)
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

/**
 * This route is used to get an aggregated view of the reservations of a CPO in all its EVCPs
 */
router.get('/', async (req, res) => {
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        const queryManagerInterface = await queryManager.getQueryManager()
        if (user) {
            const aggregation = await queryManagerInterface.aggregateCPOData(user)
            return res.status(200).json(aggregation)
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

module.exports = { router: router, book: book }