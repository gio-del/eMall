const router = require('express').Router()
const queryManager = require('../QueryManager')
const dsoAPI = require('./dsoAPI')
const {authenticate} = require('./AccountManager')

router.get('/:evcpID', async (req, res) => {
    const { evcpID } = req.params
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        const queryManagerInterface = await queryManager.getQueryManager()
        if (user && queryManagerInterface.verifyEVCPAssociation(user, evcpID)) {
            const dso = await queryManagerInterface.getDSO(evcpID)
            return res.status(200).json(dso)
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

router.get('/dso/:evcpID', async (req, res) => {
    const { evcpID } = req.params
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        const queryManagerInterface = await queryManager.getQueryManager()
        if (user && queryManagerInterface.verifyEVCPAssociation(user, evcpID)) {
            const dso = await dsoAPI.getDSOsAvailable(evcpID)
            return res.status(200).json(dso)
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})


router.post('/dso/:evcpID', async (req, res) => {
    const { evcpID } = req.params
    const { dsoID } = req.body
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        const queryManagerInterface = await queryManager.getQueryManager()
        if (user && queryManagerInterface.verifyEVCPAssociation(user, evcpID)) {
            const dso = await dsoAPI.setDSO(dsoID)
            if (dso) {
                await queryManagerInterface.updateDSO(evcpID, dso.DSO_name, dso.DSO_pricekW, dso.DSO_contract_expiry)
                return res.status(200).json({ message: 'DSO updated' })
            }
            else return res.status(400).json({ error: 'DSO not available' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

module.exports = router