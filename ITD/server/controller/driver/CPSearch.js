const router = require('express').Router()

const queryManager = require('../QueryManager')

/**
 * This route is used to get the list of EVCPs
 */
router.get('/', async (req, res) => {
    return getEVCPs(req, res)
})

const getEVCPs = async (req, res) => {
    const { latitude, longitude } = req.query

    const queryManagerInterface = await queryManager.getQueryManager()

    const cps = await queryManagerInterface.getEVCPs(latitude, longitude)

    return res.status(200).json(cps)
}

/**
 * Details of a specif EVCP
 */
router.get('/:id', async (req, res) => {
    return getDetailsEVCP(req, res)
})

const getDetailsEVCP = async (req, res) => {
    const { id } = req.params

    const queryManagerInterface = await queryManager.getQueryManager()

    const details = await queryManagerInterface.getDetailsEVCP(id)

    return res.status(200).json(details)
}

module.exports = { cpSearch: router, getEVCPs, getDetailsEVCP }