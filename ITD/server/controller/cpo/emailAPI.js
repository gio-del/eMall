// This class is used to simulate the email API

/**
 * Sends an email to the user with the verification code
 * @param {*} email the email of the user
 * @param {*} code the verification code
 */
exports.sendVerificationCode = (email, code) => {
    console.log(`Sent ${code} to ${email}`)
}