const queryManager = require('../QueryManager')
const bcrypt = require('bcrypt')
const sms = require('../SMSAPI')

const router = require('express').Router()

router.post('/signup', (req, res) => {
    const { firstName, lastName, password, phoneNumber } = req.body
    queryManager.getQueryManager().
        then(queryManagerInterface =>
            queryManagerInterface.checkIfAlreadyExist(phoneNumber).
                then((occupied) => {
                    if (!occupied) {
                        bcrypt.hash(password, 10).
                            then((hash) =>
                                queryManagerInterface.createDriver(firstName, lastName, hash, phoneNumber).
                                    then((driverID) => {
                                        const code = Math.floor(100000 + Math.random() * 900000)
                                        queryManagerInterface.createDriverVerificationCode(driverID, code)
                                        sms.sendVerificationCode(phoneNumber, code)
                                        res.status(200).json({ message: 'A verification code is sent via SMS' })
                                    }))

                    }
                    else {
                        res.status(409).json({ error: 'The chosen phone number is already selected' })
                    }
                }))
})

router.post('/code', (req, res) => {
    const { driverID, code } = req.body
    queryManager.getQueryManager().
        then(queryManagerInterface =>
            queryManagerInterface.checkVerificationCode(driverID).
                then((row) => {
                    if (row) {
                        console.log(new Time() - row.expiry_date)
                        if (new Time() - row.expiry_date < 0) {
                            if(code === row.code)
                                queryManagerInterface.deletePin(driverID).then()
                            else {
                                const code = Math.floor(100000 + Math.random() * 900000)
                                queryManagerInterface.updatePin(driverID, code).then(() => {
                                    sms.sendVerificationCode(row.phoneNumber,code)
                                    res.status(200).json({message: "Wrong code, retry"})
                                })
                            }

                        } else {
                            queryManagerInterface.deleteUser(driverID)
                    }
                        res.status(200).json({ message: 'A verification code is sent via SMS' })
                    }
                    else {
                        res.status(409).json({ error: 'Tntrusion' })
                    }
                }))
})

module.exports = router


