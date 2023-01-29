const { authenticate } = require('../driver/AccountManager')
const queryManager = require('../QueryManager')
const { book } = require('../cpo/BookingManager')
const router = require('express').Router()
const { startCharge } = require('../cpo/ChargingPointManager')

router.get('/', async (req, res) => {
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const queryManagerInterface = await queryManager.getQueryManager()
            const reservations = await queryManagerInterface.getDriverReservations(user)
            return res.status(200).json(reservations)
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

router.get('/slot/:id', async (req, res) => {
    const { type, power, date } = req.query
    const { id } = req.params

    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const queryManagerInterface = await queryManager.getQueryManager()
            const slots = await queryManagerInterface.checkReservationSlots(id, type, power, date)
            return res.status(200).json(slots)
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

router.get('/duration/:id', async (req, res) => {
    const { type, power, timeFrom } = req.query
    const { id } = req.params

    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const queryManagerInterface = await queryManager.getQueryManager()
            const maxDuration = await queryManagerInterface.checkMaxDuration(id, type, power, timeFrom)
            return res.status(200).json(maxDuration)
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

router.post('/:id', async (req, res) => {
    const { type, power, timeFrom, timeTo } = req.body
    const { id } = req.params
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const resBooking = await book(user, id, type, power, timeFrom, timeTo)
            if (resBooking) return res.status(200).json({ message: "The reservation has been accepted" })
            else return res.status(409).json({ error: 'Conflict' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

/**
 * Start the charging of a reservation given its reservationID
 */
router.post('/start/:id', async (req, res) => {
    const { id } = req.params
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const queryManagerInterface = await queryManager.getQueryManager()
            const socketID = await queryManagerInterface.findSocket(id)
            const resStart = await startCharge(socketID)
            if (resStart) return res.status(200).json({ message: "The charging has been started" })
            else return res.status(404).json({ error: 'Charging not started, error' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

module.exports = router