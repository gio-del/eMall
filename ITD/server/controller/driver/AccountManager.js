const queryManager = require('../QueryManager')
const bcrypt = require('bcrypt')
const sms = require('../smsAPI')

const router = require('express').Router()

router.post('/signup', async (req, res) => {
    const { firstName, lastName, password, phoneNumber } = req.body

    const phoneNumRegex = /^\d{10}$/
    if (!phoneNumRegex.test(phoneNumber))
        return res.status(400).json({ error: "Phone number not valid" })


    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if (!passwordRegex.test(password))
        return res.status(400).json({ error: "Password must contain at least 8 character (at least one uppercase), at least 1 special symbol and at least 1 number" })

    const queryManagerInterface = await queryManager.getQueryManager()

    const user = await queryManagerInterface.findDriverByPhoneNumber(phoneNumber)

    if (!user) {
        const hash = await bcrypt.hash(password, 10)
        const driverID = await queryManagerInterface.createDriver(firstName, lastName, hash, phoneNumber)
        const code = getCode()
        queryManagerInterface.createDriverVerificationCode(driverID, code)
        sms.sendVerificationCode(phoneNumber, code)
        return res.status(200).json({ message: 'A verification code is sent via SMS', id: driverID })
    }

    else {
        return res.status(409).json({ error: 'An account with the same phone number already exist, retry' })
    }
})

router.post('/code', async (req, res) => {
    const { driverID, code } = req.body

    const codeRegex = /^\d{6}$/
    if (!codeRegex.test(code))
        return res.status(400).json({ error: 'Code must be a six-digit number' })

    const queryManagerInterface = await queryManager.getQueryManager()
    const row = await queryManagerInterface.checkVerificationCode(driverID)
    if (row) {
        // console.log((new Date().getTime() - row.expiryDate.getTime()) / 1000)

        if (new Date() - row.expiryDate < 0) {
            if (code === row.code) {
                await queryManagerInterface.deletePin(driverID)
                return res.status(200).json({ message: 'Code inserted is valid, user verified' })
            }
            else {
                const code = getCode()
                await queryManagerInterface.updatePin(driverID, code)
                sms.sendVerificationCode(row.phoneNumber, code)
                return res.status(400).json({ error: "Wrong code, retry", id: driverID })
            }

        } else {
            await queryManagerInterface.deleteUser(driverID)
            return res.status(410).json({ error: "Too late, the code is expired. Register a new account." })
        }
    }
    else {
        return res.status(409).json({ error: 'Intrusion' })
    }
})

/**
 * Login create the token if the credentials are valid
 */
router.post('/login', async (req, res) => {
    const { phoneNumber, password } = req.body
    const queryManagerInterface = await queryManager.getQueryManager()

    const phoneNumRegex = /^\d{10}$/
    if (!phoneNumRegex.test(phoneNumber))
        return res.status(400).json({ error: "Phone number not valid" })

    const user = await queryManagerInterface.findDriverByPhoneNumber(phoneNumber)

    if (!user)
        return res.status(401).json({ error: 'Phone number or Password are wrong' });

    // check that the user is verified, so there is no verification code associated to it
    const toVerify = await queryManagerInterface.checkVerificationCode(user.driverID)
    if (!toVerify) {
        const valid = await queryManagerInterface.checkDriverCredentials(phoneNumber, password)
        if (valid) {
            const token = await queryManagerInterface.createDriverToken(user.driverID)
            return res.status(200).json({ token: token })
        }
        else {
            return res.status(401).json({ error: 'Phone number or Password are wrong' })
        }
    } else {
        // sendCode and usual stuff
    }
})

/**
 * Generate a random 6-digit verification code
 * @returns the random verification code
 */
const getCode = () => {
    return Math.floor(100000 + Math.random() * 900000)
}

const authenticate = async (token) => {
    const queryManagerInterface = await queryManager.getQueryManager()

    const userID = await queryManagerInterface.validateToken(token)

    return userID
}

module.exports = {
    authenticate: authenticate,
    router: router
}