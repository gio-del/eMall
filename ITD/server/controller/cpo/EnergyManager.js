const router = require('express').Router()
const queryManager = require('../QueryManager')
const dsoAPI = require('./dsoAPI')
const energyAPI = require('./energyAPI')
const { authenticate } = require('./AccountManager')


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
            const date = await queryManagerInterface.getDSO(evcpID)
            const dso = await dsoAPI.setDSO(dsoID, date.DSOexpiry)
            if (dso) {
                await queryManagerInterface.updateDSO(evcpID, dso.DSOname, dso.DSOprice, dso.DSOexpiry)
                return res.status(200).json({ message: 'DSO updated' })
            }
            else return res.status(400).json({ error: 'DSO not available' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
}

/**
 * This route is used to set the battery key of a specific EVCP
 */
router.post('/battery/:evcpID', async (req, res) => {
    const { evcpID } = req.params
    const { batteryKey } = req.body
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        const queryManagerInterface = await queryManager.getQueryManager()
        const association = await queryManagerInterface.verifyEVCPAssociation(user, evcpID)
        if (user && association) {
            await queryManagerInterface.updateBatteryKey(evcpID, batteryKey)
            return res.status(200).json({ message: 'Battery key updated' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

router.get('/battery/:evcpID', async (req, res) => {
    const { evcpID } = req.params
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        const queryManagerInterface = await queryManager.getQueryManager()
        const association = await queryManagerInterface.verifyEVCPAssociation(user, evcpID)
        if (user && association) {
            const batteryKey = await queryManagerInterface.getBatteryKeyByEVCP(evcpID)
            return res.status(200).json(batteryKey)
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

/**
 * This route is used to get the battery mode of a specific EVCP given the evcpID
 */
router.get('/mode/:evcpID', async (req, res) => {
    const { evcpID } = req.params
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        const queryManagerInterface = await queryManager.getQueryManager()
        const association = await queryManagerInterface.verifyEVCPAssociation(user, evcpID)
        if (user && association) {
            const batteryKey = await queryManagerInterface.getBatteryKeyByEVCP(evcpID)
            if (!batteryKey) return res.status(400).json({ error: 'Battery key not set' })
            const mode = await energyAPI.getBatteryMode(batteryKey)
            return res.status(200).json(mode)
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

/**
 * This route is used to get the battery mode available
 */
router.get('/modes/', async (req, res) => {
    return res.status(200).json(energyAPI.getMode())
})

/**
 * This route is used to set the battery mode of a specific EVCP given the battery key
 */
router.post('/mode/:evcpID', async (req, res) => {
    const { evcpID } = req.params
    const { modeName } = req.body
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        const queryManagerInterface = await queryManager.getQueryManager()
        const association = await queryManagerInterface.verifyEVCPAssociation(user, evcpID)
        if (user && association) {
            const batteryKey = await queryManagerInterface.getBatteryKeyByEVCP(evcpID)
            if (!batteryKey) return res.status(400).json({ error: 'Battery key not set' })
            const result = energyAPI.setMode(modeName, batteryKey)
            if (!result) return res.status(400).json({ error: 'Mode not available' })
            return res.status(200).json({ message: 'Battery mode is updated' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

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


module.exports = { energyManager: router, getDSO, getDSOAvailability, changeDSO }