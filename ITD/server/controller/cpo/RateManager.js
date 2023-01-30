const router = require('express').Router()
const { authenticate } = require('./AccountManager')
const queryManager = require('../QueryManager')

/**
 * This route is used to add a new rate to a specific EVCP
 */
router.post('/:evcpID', async (req, res) => {
    return addRate(req, res)
})

const addRate = async (req, res) => {
    const { evcpID } = req.params
    const { typeName, flatPrice, variablePrice } = req.body
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        const queryManagerInterface = await queryManager.getQueryManager()
        const association = await queryManagerInterface.verifyEVCPAssociation(user, evcpID)
        if (user && association) {
            const result = await queryManagerInterface.addRate(evcpID, typeName, flatPrice, variablePrice)
            if (result)
                return res.status(200).json({ message: 'Rate added', rate: result })
            else return res.status(400).json({ error: 'EVCP not available' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
}

/**
 * This route is used to get the rates of a specific EVCP
 */
router.get('/:evcpID', async (req, res) => {
    return getRates(req, res)
})

const getRates = async (req, res) => {
    const { evcpID } = req.params
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        const queryManagerInterface = await queryManager.getQueryManager()
        const association = await queryManagerInterface.verifyEVCPAssociation(user, evcpID)
        if (user && association) {
            const rates = await queryManagerInterface.getRate(evcpID)
            return res.status(200).json(rates)
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
}

module.exports = { rateManager: router, addRate, getRates }