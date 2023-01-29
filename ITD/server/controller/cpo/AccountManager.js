const queryManager = require('../QueryManager')
const bcrypt = require('bcrypt')
const emailAPI = require('./emailAPI')

const router = require('express').Router()

router.post('/signup', async (req, res) => {
    const { companyName, email, password } = req.body

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!emailRegex.test(email))
        return res.status(400).json({ error: "eMail not valid" })

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if (!passwordRegex.test(password))
        return res.status(400).json({ error: "Password must contain at least 8 character (at least one uppercase), at least 1 special symbol and at least 1 number" })

    const queryManagerInterface = await queryManager.getQueryManager()

    const user = await queryManagerInterface.findCPOByEmail(email)
    let oldCode
    if (user) oldCode = await queryManagerInterface.checkCPOVerificationCode(user.cpoID)
    console.log(oldCode)
    if (!user || oldCode) {
        if (user) await queryManagerInterface.deleteCPO(user.cpoID)
        const hash = await bcrypt.hash(password, 10)
        const cpoID = await queryManagerInterface.createCPO(companyName, hash, email)
        const code = getCode()
        queryManagerInterface.createCPOVerificationCode(cpoID, code)
        emailAPI.sendVerificationCode(email, code)
        return res.status(200).json({ message: 'A verification code is sent via mail', id: cpoID })
    }

    else return res.status(409).json({ error: 'An account with the same email already exist, retry' })

})

router.post('/code', async (req, res) => {
    const { cpoID, code } = req.body

    const codeRegex = /^\d{6}$/
    if (!codeRegex.test(code))
        return res.status(400).json({ error: 'Code must be a six-digit number' })

    const queryManagerInterface = await queryManager.getQueryManager()
    const row = await queryManagerInterface.checkCPOVerificationCode(cpoID)
    if (row) {
        // console.log((new Date().getTime() - row.expiryDate.getTime()) / 1000)

        if (new Date() - row.expiryDate < 0) {
            if (code === row.code) {
                await queryManagerInterface.deleteCPOCode(cpoID)
                return res.status(200).json({ message: 'Code inserted is valid, user verified' })
            }
            else {
                const code = getCode()
                await queryManagerInterface.updateCPOCode(cpoID, code)
                emailAPI.sendVerificationCode(row.email, code)
                return res.status(400).json({ error: "Wrong code, retry", id: cpoID })
            }

        } else {
            await queryManagerInterface.deleteCPO(cpoID)
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
    const { email, password } = req.body
    const queryManagerInterface = await queryManager.getQueryManager()

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!emailRegex.test(email))
        return res.status(400).json({ error: "eMail not valid" })

    const user = await queryManagerInterface.findCPOByEmail(email)

    if (!user)
        return res.status(401).json({ error: 'Email or Password are wrong' });

    // check that the user is verified, so there is no verification code associated to it
    const toVerify = await queryManagerInterface.checkCPOVerificationCode(user.cpoID)
    if (!toVerify) {
        const valid = await queryManagerInterface.checkCPOCredentials(email, password)
        if (valid) {
            const token = await queryManagerInterface.createCPOToken(user.cpoID)
            return res.status(200).cookie('token', token, { maxAge: 60 * 60 * 24 * 20 * 1000, httpOnly: false }).json({ message: 'Cookie Token has been set' });
        }
        else {
            return res.status(401).json({ error: 'Email or Password are wrong' })
        }
    } else {
        await queryManagerInterface.deleteCPO(user.cpoID)
        return res.status(410).json({ error: "User not verified. Register a new account." })
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

    const user = await queryManagerInterface.validateToken(token)
    if (user) return user.cpoID
    else return undefined
}

module.exports = {
    authenticate: authenticate,
    router: router
}