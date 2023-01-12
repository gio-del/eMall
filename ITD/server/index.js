const express = require('express')
const cors = require('cors')
const app = express()
const driverRoutes = require('./routes/Driver')
const cpoRoutes = require('./routes/CPO')


const PORT = 8080

// middleware, json to parse incoming request cors to avoid XSS attack
app.use(express.json())
app.use(cors())

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