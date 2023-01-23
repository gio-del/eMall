const accountManager = require('../controller/cpo/AccountManager').router
const bookingManager = require('../controller/cpo/BookingManager').router
const chargingPointManger = require('../controller/cpo/ChargingPointManager')
const energyManager = require('../controller/cpo/EnergyManager')
const rateManager = require('../controller/cpo/RateManager')

/*
    This component handles the routes related to the CPOs
    All the routes starts with /api/cpo
*/
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