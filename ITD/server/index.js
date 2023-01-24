const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const driverRoutes = require('./routes/Driver')
const cpoRoutes = require('./routes/CPO')
const cron = require('node-cron')
const notifyUsers = require('./controller/driver/NotificationManager')

const PORT = 3000

// middleware, json to parse incoming request, cors to avoid XSS attack and cookie-parser
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// LOG requests
app.use((req, res, next) => {
    console.log(`Request at: ${Date()}`)
    console.log("URL: ", req.url)
    console.log("BODY: ", req.body)
    console.log("PARAM: ", req.params)
    console.log("QUERY: ", req.query)
    next()
})

// boot the server
app.listen(PORT, () => {
    console.log(`Server listen on http://localhost:${PORT}`)
})

app.get('/api', (req, res) => {
    res.status(200).send('This is the eMall API')
})

app.use('/api/driver', driverRoutes)
app.use('/api/cpo', cpoRoutes)

cron.schedule('*/1 * * * *', async () => {
    await notifyUsers();
});
