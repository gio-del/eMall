const queryManager = require('../QueryManager')
const admin = require('firebase-admin')
const serviceAccount = require('../../emall-b53e5-firebase-adminsdk-ztnob-ef034764f2.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const notifyUsers = async () => {
    // Retrieve all reservations that have ended and haven't been notified yet
    const queryManagerInterface = await queryManager.getQueryManager()
    const tokens = await queryManagerInterface.checkReservationsEnded()
    const payload = {
        notification: {
            title: 'Reservation ended',
            body: 'Your reservation is ended',
        },
    }
    tokens.forEach((token) => {
        if (token.notificationToken) {
            admin.messaging().sendToDevice(token.notificationToken, payload).then((res) => console.log(`Sent a notification`))
                .catch((error) => {
                    console.log('Error sending message:', error);
                })
        }
    })
}
module.exports = notifyUsers
