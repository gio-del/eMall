const queryManager = require('../QueryManager')
const router = require('express').Router()
const { authenticate } = require('./AccountManager')

const book = async (driverID, evcpID, type, power, timeFrom, timeTo) => {
    const queryManagerInterface = await queryManager.getQueryManager()
    const available = await queryManagerInterface.checkAvailability(evcpID, type, power, timeFrom, timeTo)
    if (available) {
        return await queryManagerInterface.addReservation(driverID, available.socketID, timeFrom, timeTo)
    }
    return false
}

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