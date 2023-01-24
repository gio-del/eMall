const router = require('express').Router()
const queryManager = require('../QueryManager')
const authenticate = require('./AccountManager').authenticate

router.get('/', async (req, res) => {
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const queryManagerInterface = await queryManager.getQueryManager()
            const evcps = await queryManagerInterface.getEVCPsByCPO(user)
            return res.status(200).json(evcps)
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

router.post('/', async (req, res) => {
    const { name, latitude, longitude, address } = req.body
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const queryManagerInterface = await queryManager.getQueryManager()
            const evcps = await queryManagerInterface.addEVCP(user, name, latitude, longitude, address)
            if (evcps) {
                return res.status(200).json({ message: 'EVCP added' })
            }
            return res.status(409).json({ error: 'An EVCP in the same spot already exists' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

router.post('/:evcpID', async (req, res) => {
    const { evcpID } = req.params
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const queryManagerInterface = await queryManager.getQueryManager()
            cp = await queryManagerInterface.addCP(evcpID)
            if (cp)
                return res.status(200).json({ message: 'CP added' })
            return res.status(400).json({ error: 'EVCP not available' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

router.post('/:cpID', async (req, res) => {
    const { cpID } = req.params
    const { power, type } = req.body

    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const queryManagerInterface = await queryManager.getQueryManager()
            const socket = await queryManagerInterface.addSocket(cpID, power, type)
            if (socket)
                return res.status(200).json({ message: 'Socket added' })
            return res.status(400).json({ error: 'Wrong body' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

module.exports = router