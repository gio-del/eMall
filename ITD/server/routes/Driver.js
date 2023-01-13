/*
    This component handles the routes related to the drivers
    All the routes starts with /api/driver
*/
const router = require('express').Router()

router.get('/', (req, res) => {
    res.status(200).send('Driver')
})

router.get('/search', (req,res) => {
    res.status(200).json([
        //CPOName, Address and Connectors comes from an API
        {
          type: 'CCS2',
          power: '1000 kW',
          price: '1,50$/h + 0,92$/kW',
          totalSockets: 1,
          availableSockets: 1,
          current: 'DC',
        },
        {
          type: 'Type2',
          power: '50 kW',
          price: '1,50$/h + 0,94$/kW',
          totalSockets: 2,
          availableSockets: 1,
          current: 'AC',
        },
      ])
})

module.exports = router