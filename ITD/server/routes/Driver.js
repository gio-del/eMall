const accountManager = require('../controller/driver/AccountManager')
const cpSearch = require('../controller/driver/CPSearch')
const reservationManager = require('../controller/driver/ReservationManager')
const carManager = require('../controller/driver/CarManager')

/*
    This component handles the routes related to the drivers
    All the routes starts with /api/driver
*/
const router = require('express').Router()



router.use('/user', accountManager)
router.use('/search', cpSearch)
router.use('/reserve', reservationManager)
router.use('/car', carManager)

router.get('/', (req, res) => {
  res.status(200).send('Driver')
})

module.exports = router