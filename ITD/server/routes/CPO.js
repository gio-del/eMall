/*
    This component handles the routes related to the CPOs
    All the routes starts with /api/cpo
*/
const router = require('express').Router()

router.get('/', (req, res) => {
    res.status(200).send('CPO')
})

module.exports = router