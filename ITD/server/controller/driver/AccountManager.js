const queryManager = require('../QueryManager')
const smsAPI = require('./smsAPI')

const router = require('express').Router()

/**
 * This is a router post request for signup. It takes the firstName, lastName, password and phoneNumber from the request body. It then checks if the phoneNumber is valid using a regex and if the password is valid using another regex. It then checks if there is an existing user with the same phone number in the database and deletes it if it exists. It then hashes the password and creates a new driver in the database with the given information. Finally, it generates a verification code for that driver and sends it via SMS to their phone number. If everything goes well, it returns a message saying that a verification code has been sent via SMS along with an id of that driver.
 */
router.post('/signup', async (req, res) => {
    return signup(req, res)
})

const signup = async (req, res) => {
    const { firstName, lastName, password, phoneNumber } = req.body
    const phoneNumRegex = /^\d{10}$/
    if (!phoneNumRegex.test(phoneNumber))
        return res.status(400).json({ error: "Phone number not valid" })


    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if (!passwordRegex.test(password))
        return res.status(400).json({ error: "Password must contain at least 8 character (at least one uppercase), at least 1 special symbol and at least 1 number" })

    const queryManagerInterface = await queryManager.getQueryManager()

    const user = await queryManagerInterface.findDriverByPhoneNumber(phoneNumber)
    let oldCode
    if (user) oldCode = await queryManagerInterface.checkDriverVerificationCode(user.driverID)
    if (!user || oldCode) {
        if (user) await queryManagerInterface.deleteDriver(user.driverID)
        const driverID = await queryManagerInterface.createDriver(firstName, lastName, password, phoneNumber)
        const code = getCode()
        queryManagerInterface.createDriverVerificationCode(driverID, code)
        smsAPI.sendVerificationCode(phoneNumber, code)
        return res.status(200).json({ message: 'A verification code is sent via SMS', id: driverID })
    }

    else return res.status(409).json({ error: 'An account with the same phone number already exist, retry' })
}


/**
 * This is a router post request that handles a driver's verification code. It first checks if the code is a six-digit number using a regex. If it is not, it returns an error message.
   It then queries the database to check if the driverID exists and retrieves the row associated with it. If the row exists, it checks if the current time is before the expiry date of the code, and if so, checks if the code matches what was sent in the request body. If it does, it deletes the driver's code from the database and returns a success message. 
   If the code does not match, it generates a new 6-digit code and sends it to the driver's phone number via SMS API. If not successful, an error message is returned with an ID for retry.
   If either of these checks fail (i.e., time expired or driverID does not exist), an error message is returned accordingly.
 */
router.post('/code', async (req, res) => {
    return verifyCode(req, res)
})

const verifyCode = async (req, res) => {
    const { driverID, code } = req.body
    const codeRegex = /^\d{6}$/
    if (!codeRegex.test(code))
        return res.status(400).json({ error: 'Code must be a six-digit number' })

    const queryManagerInterface = await queryManager.getQueryManager()
    const row = await queryManagerInterface.checkDriverVerificationCode(driverID)
    if (row) {
        if (new Date() - row.expiryDate < 0) {
            if (code === row.code) {
                await queryManagerInterface.deleteDriverCode(driverID)
                return res.status(200).json({ message: 'Code inserted is valid, user verified' })
            }
            else {
                const code = getCode()
                await queryManagerInterface.updateDriverCode(driverID, code)
                smsAPI.sendVerificationCode(row.phoneNumber, code)
                return res.status(400).json({ error: "Wrong code, retry", id: driverID })
            }

        } else {
            await queryManagerInterface.deleteDriver(driverID)
            return res.status(410).json({ error: "Too late, the code is expired. Register a new account." })
        }
    }
    else {
        return res.status(409).json({ error: 'Intrusion' })
    }
}

/**
 * This is a router post request for the '/login' endpoint. It takes in a phone number and password from the request body and checks if the phone number is valid using a regex. If it is not valid, it returns an error message. If it is valid, it looks for a user with that phone number in the database. If no user is found, an error message is returned. If a user is found, it checks if that user has been verified and if not, returns an error message. If the user has been verified, it checks if the credentials match those in the database and if they do, creates a token cookie and returns a success message.
 */
router.post('/login', async (req, res) => {
    return login(req, res)
})

const login = async (req, res) => {
    const { phoneNumber, password } = req.body
    const queryManagerInterface = await queryManager.getQueryManager()

    const phoneNumRegex = /^\d{10}$/
    if (!phoneNumRegex.test(phoneNumber))
        return res.status(400).json({ error: "Phone number not valid" })

    const user = await queryManagerInterface.findDriverByPhoneNumber(phoneNumber)

    if (!user)
        return res.status(401).json({ error: 'Phone number or Password are wrong' });

    // check that the user is verified, so there is no verification code associated to it
    const toVerify = await queryManagerInterface.checkDriverVerificationCode(user.driverID)
    if (!toVerify) {
        const valid = await queryManagerInterface.checkDriverCredentials(phoneNumber, password)
        if (valid) {
            const token = await queryManagerInterface.createDriverToken(user.driverID)
            return res.status(200).cookie('token', token, { maxAge: 60 * 60 * 24 * 20 * 1000, httpOnly: false }).json({ message: 'Cookie Token has been set' });
        }
        else {
            return res.status(401).json({ error: 'Phone number or Password are wrong' })
        }
    } else {
        await queryManagerInterface.deleteDriver(user.driverID)
        return res.status(410).json({ error: "User not verified. Register a new account." })
    }
}

/**
 * This code is a router patch request that is used to update the notification token for a user. The code first checks if the request contains a cookie with a token, and if so, it authenticates the user. If the user is authenticated, it updates the notification token in the query manager interface with the messaging token from the request body. If successful, it returns a status of 200 with a message of 'Notification Token Set Correctly'. If authentication fails, it returns an error of 401 Unauthorized.
 */
router.patch('/notification', async (req, res) => {
    const { messagingToken } = req.body
    const queryManagerInterface = await queryManager.getQueryManager()
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            await queryManagerInterface.updateNotificationToken(user, messagingToken)
            return res.status(200).json({ message: 'Notification Token Set Correctly' })
        }
    }
    return res.status(401).json({ error: 'Unauthorized' })
})

/**
 * This route is used to log out a user. It first checks if the request contains a cookie with a token, and if so, it authenticates the user. If the user is authenticated, it deletes the token from the database and clears the cookie. If successful, it returns a status of 200 with a message of 'Cookie Token has been cleared'.
 */
router.post('/logout', async (req, res) => {
    return logout(req, res)
})

const logout = async (req, res) => {
    const queryManagerInterface = await queryManager.getQueryManager()
    if (req.cookies.token) {
        const token = req.cookies.token
        const user = await authenticate(token)
        if (user) {
            await queryManagerInterface.deleteDriverToken(user)
            return res.status(200).clearCookie('token').json({ message: 'Cookie Token has been cleared' })
        }
        else return res.status(401).json({ error: 'User not logged in' })
    }
    else return res.status(400).json({ error: 'No token found' })
}

/**
 * Generate a random 6-digit verification code
 * @returns the random verification code
 */
const getCode = () => {
    return Math.floor(100000 + Math.random() * 900000)
}

/**
 * authenticate() is an asynchronous function that takes in a token as an argument. It uses the queryManager module to get the queryManagerInterface, and then uses the validateToken() method of the queryManagerInterface to validate the token. If the token is valid, it returns the driverID associated with it, otherwise it returns undefined. 
 */
const authenticate = async (token) => {
    const queryManagerInterface = await queryManager.getQueryManager()

    const user = await queryManagerInterface.validateToken(token)
    if (user) return user.driverID
    else return undefined
}

module.exports = {
    login: login,
    signup: signup,
    verifyCode: verifyCode,
    authenticate: authenticate,
    accountManager: router,
    logout: logout
}