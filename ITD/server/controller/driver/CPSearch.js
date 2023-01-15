const router = require('express').Router()

const queryManager = require('../QueryManager')

router.get('/', async (req, res) => {
    const { latitude, longitude, filters } = req.query

    const queryManagerInterface = await queryManager.getQueryManager()

    const cps = await queryManagerInterface.getEVCPs(latitude, longitude, filters)

    return res.status(200).json(cps)
})

module.exports = router