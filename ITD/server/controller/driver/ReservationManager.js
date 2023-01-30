const { authenticate } = require('../driver/AccountManager')
const queryManager = require('../QueryManager')
const { book } = require('../cpo/BookingManager')
const router = require('express').Router()
const { startCharge } = require('../cpo/ChargingPointManager')

/**
 * This route is used to get the list of reservations of a specific driver
 */
router.get('/', async (req, res) => {
    return getReservations(req, res)
})

const getReservations = async (req, res) => {
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
}

/**
 * Get the available slots given the reservationID, the type of the socket, the power of the socket and the date of the reservation
 */
router.get('/slot/:id', async (req, res) => {
    return getSlots(req, res)
})

const getSlots = async (req, res) => {
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
}

/**
 * Get the maximum duration of a reservation given the reservationID, the type of the socket, the power of the socket and the timeFrom of the reservation
 */
router.get('/duration/:id', async (req, res) => {
    return getMaxDuration(req, res)
})

const getMaxDuration = async (req, res) => {
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
}

/**
 * Book a reservation given the reservationID, the type of the socket, the power of the socket and the timeFrom and timeTo of the reservation
 */
router.post('/:id', async (req, res) => {
    return bookACharge(req, res)
})

const bookACharge = async (req, res) => {
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
}

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

module.exports = { reservationManager: router, getReservations, getSlots, getMaxDuration, bookACharge }