const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const driverRoutes = require('./routes/Driver')
const cpoRoutes = require('./routes/CPO')
const cron = require('node-cron')
const notifyUsers = require('./controller/driver/NotificationManager')
const updateReservations = require('./controller/cpo/ChargingPointManager')
const fs = require('fs')

const PORT = 3000

/**
 * Middleware used to parse the body of the request, and to allow CORS, and to parse cookies
 */
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())

// This is unsecure, but it is needed to allow the client to send cookies for the sake of the demo
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

/**
 * Custom middleware used to log the request
 */
app.use((req, res, next) => {
    console.log(`Request at: ${Date()}`)
    console.log("URL: ", req.url)
    console.log("BODY: ", req.body)
    console.log("PARAM: ", req.params)
    console.log("QUERY: ", req.query)
    next()
})

/**
 * Start the server
 */
app.listen(PORT, () => {
    console.log(`Server listen on http://localhost:${PORT}`)
})

app.get('/api', (req, res) => {
    res.status(200).send('This is the eMall API')
})

/**
 * Routes for the driver and the CPO
 */
app.use('/api/driver', driverRoutes)
app.use('/api/cpo', cpoRoutes)

/**
 * This cron job is used to notify the drivers when their reservation is ended
 */
cron.schedule('*/1 * * * *', async () => {
    await updateReservations()
    if (!fs.existsSync('./emall-b53e5-firebase-adminsdk-ztnob-ef034764f2.json')) return
    await notifyUsers()
});

module.exports = app
