const queryManager = require('../QueryManager')
const router = require('express').Router()

const book = async (driverID, evcpID, type, power, timeFrom, timeTo) => {
    const queryManagerInterface = await queryManager.getQueryManager()
    const available = await queryManagerInterface.checkAvailability(evcpID, type, power, timeFrom, timeTo)
    if (available) {
        return await queryManagerInterface.addReservation(driverID, available.socketID, timeFrom, timeTo)
    }
    return false
}

module.exports = { router: router, book: book }