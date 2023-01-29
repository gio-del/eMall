// This file contains the routes for the CPO

const accountManager = require('../controller/cpo/AccountManager').router
const bookingManager = require('../controller/cpo/BookingManager').router
const { chargingPointManger } = require('../controller/cpo/ChargingPointManager')
const energyManager = require('../controller/cpo/EnergyManager')
const rateManager = require('../controller/cpo/RateManager')

const router = require('express').Router()

router.use('/user', accountManager)
router.use('/book', bookingManager)
router.use('/cp', chargingPointManger)
router.use('/energy', energyManager)
router.use('/rate', rateManager)

router.get('/', (req, res) => {
    res.status(200).send('CPO')
})

module.exports = router