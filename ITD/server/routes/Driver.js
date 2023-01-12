/*
    This component handles the routes related to the drivers
    All the routes starts with /api/driver
*/
const router = require('express').Router()

router.get('/', (req, res) => {
    res.status(200).send('Driver')
})

module.exports = router