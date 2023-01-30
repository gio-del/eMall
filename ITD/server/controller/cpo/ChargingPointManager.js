const router = require('express').Router()
const queryManager = require('../QueryManager')
const { authenticate } = require('./AccountManager')

const { CentralSystem } = require('@voltbras/ts-ocpp')

/**
 * This function returns all EVCPs of the CPO
 */
router.get('/', async (req, res) => {
    return getAllEVCPs(req, res)
})

const getAllEVCPs = async (req, res) => {
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
}
/**
 * This function returns the details of the EVCP with the given evcpID
 */
router.get('/:evcpID', async (req, res) => {
    return getDetailsEVCP(req, res)
})

const getDetailsEVCP = async (req, res) => {
    const { evcpID } = req.params
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const queryManagerInterface = await queryManager.getQueryManager()
            const evcps = await queryManagerInterface.getSpecificEVCP(evcpID)
            return res.status(200).json(evcps)
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
}

/**
 * This function adds an EVCP to the CPO
 */
router.post('/', async (req, res) => {
    return addEVCP(req, res)
})

const addEVCP = async (req, res) => {
    const { name, latitude, longitude, address } = req.body
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const queryManagerInterface = await queryManager.getQueryManager()
            const evcps = await queryManagerInterface.addEVCP(user, name, latitude, longitude, address)
            if (evcps) {
                return res.status(200).json({ message: 'EVCP added', evcpID: evcps })
            }
            return res.status(409).json({ error: 'An EVCP in the same spot already exists' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
}

/**
 * This function adds a charge point to the EVCP with the given evcpID
 */
router.post('/:evcpID', async (req, res) => {
    return addCP(req, res)
})

const addCP = async (req, res) => {
    const { evcpID } = req.params
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const queryManagerInterface = await queryManager.getQueryManager()
            const association = await queryManagerInterface.verifyEVCPAssociation(user, evcpID)
            if (!association) return res.status(401).json({ error: 'Unauthorized' })
            cp = await queryManagerInterface.addCP(evcpID)
            if (cp)
                return res.status(200).json({ message: 'CP added', cpID: cp })
            return res.status(400).json({ error: 'EVCP not available' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
}

/**
 * This function adds a socket to the charge point with the given cpID
 */
router.post('/:cpID', async (req, res) => {
    return addSocket(req, res)
})

const addSocket = async (req, res) => {
    const { cpID } = req.params
    const { power, type } = req.body

    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            const queryManagerInterface = await queryManager.getQueryManager()
            const socket = await queryManagerInterface.addSocket(cpID, power, type)
            if (socket)
                return res.status(200).json({ message: 'Socket added', socketID: socket })
            return res.status(400).json({ error: 'Wrong body' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
}

// THE PART DEDICATED TO THE OCPP SERVER

/**
 * This function creates a new CentralSystem object that will handle the requests from the charge points
 */
const cpms = new CentralSystem(5000, (req, metadata) => {
    const { ocppVersion } = req;
    switch (req.action) {
        case 'Authorize':
            return { action: req.action, ocppVersion };
        case 'MeterValues':
            return handleMeterValues(req, metadata)
        case 'Heartbeat':
            console.log('hearbeat by: ', metadata.chargePointId)
            return { action: req.action, ocppVersion, currentTime: new Date().toISOString() };
        case 'StatusNotification':
            return { action: req.action, ocppVersion };
    }
    throw new Error('not supported');
});

/**
 * This array contains the updated meter values received from the charge points
 */
let meterValues = []

/**
 * This function handles the meter values received from the charge points
 * @param {*} req the request received from the charge point
 * @param {*} metadata the metadata of the charge point
 * @returns th
 */
const handleMeterValues = (req, metadata) => {
    const { chargePointId } = metadata
    const { connectorId, meterValue } = req
    const { timestamp, sampledValue } = meterValue[0]
    const { value } = sampledValue[0]
    console.log('Meter values received from: ', chargePointId, 'connector: ', connectorId, 'value: ', value, 'timestamp: ', timestamp)
    const meterValueObject = { chargePointId, connectorId, timestamp, value }
    const index = meterValues.findIndex(mv => mv.chargePointId === chargePointId)
    if (index === -1)
        meterValues.push(meterValueObject)
    else
        meterValues[index] = meterValueObject
    return { action: req.action, ocppVersion: req.ocppVersion }
}

cpms.addConnectionListener(async (id, status) => {
    if (status === 'connected') {
        console.log('New CP connected: ', id)
        await startCharge(12)
    }
    if (status === 'disconnected')
        console.log('CP disconnected: ', id)
})

/**
 * This function starts a charge in the socket with the given socketID
 * @param {*} socketID the ID of the socket to start the charge in
 */
const startCharge = async (socketID) => {
    const response = await cpms.sendRequest({
        ocppVersion: 'v1.6-json',
        action: 'RemoteStartTransaction',
        chargePointId: socketID,
        payload: {
            connectorId: 1,
            idTag: '1234567890',
        }
    })
    console.log(response.extract())
}

/**
 * Gets the current charge value of the socket with the given socketID
 * @param {*} socketID the ID of the socket to get the charge value from
 * @returns the current charge value of the socket with the given socketID
 */
const getChargeValue = (socketID) => {
    const index = meterValues.findIndex(mv => mv.chargePointId === socketID)
    if (index === -1)
        return 0
    return meterValues[index].value
}

module.exports = { chargingPointManger: router, startCharge, getChargeValue, getAllEVCPs, getDetailsEVCP, addEVCP, addCP, addSocket }