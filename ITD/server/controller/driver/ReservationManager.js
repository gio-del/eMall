const authenticate = require('../driver/AccountManager').authenticate
const queryManager = require('../QueryManager')
const book = require('../cpo/BookingManager').book
const router = require('express').Router()

router.get('/', async (req, res) => {
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const queryManagerInterface = await queryManager.getQueryManager()
            const reservations = await queryManagerInterface.getDriverReservations(user.driverID)
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

router.post('/', async (req, res) => {
    const { evcpID, type, power, timeFrom, timeTo } = req.body
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const id = user.driverID
            const book = await book(id, evcpID, type, power, timeFrom, timeTo)
            if (book) return res.status(200).json({ message: "The reservation has been accepted" })
            else return res.status(409).json({ error: 'Conflict' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

module.exports = router