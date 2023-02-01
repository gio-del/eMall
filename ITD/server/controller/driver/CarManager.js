const router = require('express').Router()
const queryManager = require('../QueryManager')
const { authenticate } = require('./AccountManager')
const { getChargeValue } = require('../cpo/ChargingPointManager')

/**
 * This route is used to get the current charge value of the car
 */
router.get('/:reservationID', async (req, res) => {
    const { reservationID } = req.params
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const queryManagerInterface = await queryManager.getQueryManager()
            const socketID = await queryManagerInterface.findSocket(reservationID)
            const chargeValue = getChargeValue(socketID)
            return res.status(200).json({ chargedValue: chargeValue })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})


module.exports = { carManager: router }