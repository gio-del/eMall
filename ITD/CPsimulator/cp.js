const express = require('express')
const cors = require('cors')

const { ChargePoint } = require('@voltbras/ts-ocpp')

const app = express()
const PORT = 3001

app.use(express.json())
app.use(cors())

app.use(express.static('.'))

const cps = []

const calculatePower = (id) => {
    const cp = getCPbyID(id)
    if (!cp) return 0
    const start = cp.start
    if (start === null) return 0
    var delta = new Date() - start;
    console.log(start)
    console.log(new Date())
    console.log(delta / (1000))
    var value = power((delta / (1000 * 3600)), cp.power)
    return value.toString();
}

const power = (time, power) => {
    return time * power
}

const getCPbyID = (id) => {
    for (cp of cps) {
        if (cp.cp.id === id) {
            return cp
        }
    }
    return null
}


app.get('/api', (req, res) => {
    return res.status(200).json(cps)
})

app.post('/api', (req, res) => {
    const { id, power } = req.body

    if (!id)
        return res.status(400).json({ error: 'id is required' })
    if (isNaN(id))
        return res.status(400).json({ error: 'id must be an integer' })
    if (!power)
        return res.status(400).json({ error: 'power is required' })
    if (isNaN(power))
        return res.status(400).json({ error: 'power must be an integer' })

    // check if cp already exists
    if (getCPbyID(id) != null) return res.status(400).json({ error: 'cp already exists' })

    const cp = new ChargePoint(
        id, (req) => {
            switch (req.action) {
                case 'RemoteStopTransaction':
                    return handleRemoteStopTransaction(id, req)
                case 'RemoteStartTransaction':
                    return handleRemoteStartTransaction(id, req)
            }
            throw new Error('message not supported');
        }, 'ws://127.0.0.1:5000'
    )
    cp.connect()
    // at the beginning, the cp is available
    cps.push({ cp: cp, status: 'Available', power: power, start: null })
    res.status(200).json({ message: 'cp created' })
})

const handleRemoteStopTransaction = (id, req) => {
    console.log('Stopping transaction on CP: ' + id)
    const cp = getCPbyID(id)
    if (!cp) return
    if (cp.status === 'Occupied') {
        cp.status = 'Available'
        return { action: req.action, ocppVersion: req.ocppVersion, status: 'Accepted' }
    }
    else return { action: req.action, ocppVersion: req.ocppVersion, status: 'Rejected' }
}

const handleRemoteStartTransaction = (id, req) => {
    console.log('Starting transaction on CP: ' + id)
    const cp = getCPbyID(id)
    if (!cp) return
    if (cp.status === 'Available') {
        cp.status = 'Occupied'
        startMeteringValues(id)
        return { action: req.action, ocppVersion: req.ocppVersion, status: 'Accepted' }
    }
    else
        return { action: req.action, ocppVersion: req.ocppVersion, status: 'Rejected' }
}


const startMeteringValues = (id) => {
    const cp = getCPbyID(id)
    if (!cp) return
    if (cp.start === null) cp.start = new Date()
    setInterval(() => {
        cp.cp.sendRequest(
            {
                action: 'MeterValues',
                ocppVersion: 'v1.6-json',
                payload: {
                    connectorId: 0,
                    meterValue: [
                        {
                            timestamp: new Date().toISOString(),
                            sampledValue: [{
                                value: `${calculatePower(id)}`,
                                unit: 'kWh'
                            }]
                        }]
                }
            }).then(console.log)
    }, 30000)
    res.send('started metering values')
}

app.get('/api/close', (req, res) => {
    cp.close()
    res.send('closed')
})

app.listen(PORT, () => {
    console.log(`Charging Point listening on http://localhost:${PORT}`)
})