const router = require('express').Router()
const authenticate = require('./AccountManager').authenticate

router.get('/',() => {
    if(req.cookies.token) {
        authenticate(token)
    }
    // return all the sockets
})

module.exports = router