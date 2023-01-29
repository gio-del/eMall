// This class is used to simulate the SMS API

/**
 * Sends an SMS to the user with the verification code
 * @param {*} phoneNumber the phone number of the user
 * @param {*} code the verification code
 */
exports.sendVerificationCode = (phoneNumber, code) => {
    console.log(`Sent ${code} to ${phoneNumber}`)
}