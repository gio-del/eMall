const router = require('express').Router()
const queryManager = require('../QueryManager')
const dsoAPI = require('./dsoAPI')
const { authenticate } = require('./AccountManager')

/**
 * This route is used to get the DSO of a specific EVCP
 */
router.get('/:evcpID', async (req, res) => {
    return getDSO(req, res)
})

const getDSO = async (req, res) => {
    const { evcpID } = req.params
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        const queryManagerInterface = await queryManager.getQueryManager()
        const association = await queryManagerInterface.verifyEVCPAssociation(user, evcpID)
        if (user && association) {
            const dso = await queryManagerInterface.getDSO(evcpID)
            return res.status(200).json(dso)
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
}

/**
 * This route is used to get the DSOs available for a specific EVCP
 */
router.get('/dso/:evcpID', async (req, res) => {
    return getDSOAvailability(req, res)
})

const getDSOAvailability = async (req, res) => {
    const { evcpID } = req.params
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        const queryManagerInterface = await queryManager.getQueryManager()
        const association = await queryManagerInterface.verifyEVCPAssociation(user, evcpID)
        if (user && association) {
            const dso = await dsoAPI.getDSOsAvailable(evcpID)
            return res.status(200).json(dso)
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
}

/**
 * This route is used to set the DSO of a specific EVCP
 */
router.post('/dso/:evcpID', async (req, res) => {
    return changeDSO(req, res)
})

const changeDSO = async (req, res) => {
    const { evcpID } = req.params
    const { dsoID } = req.body
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        const queryManagerInterface = await queryManager.getQueryManager()
        const association = await queryManagerInterface.verifyEVCPAssociation(user, evcpID)
        if (user && association) {
            const dso = await dsoAPI.setDSO(dsoID)
            if (dso) {
                await queryManagerInterface.updateDSO(evcpID, dso.DSOname, dso.DSOprice, dso.DSOexpiry)
                return res.status(200).json({ message: 'DSO updated' })
            }
            else return res.status(400).json({ error: 'DSO not available' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
}

module.exports = { energyManager: router, getDSO, getDSOAvailability, changeDSO }