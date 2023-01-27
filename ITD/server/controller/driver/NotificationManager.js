const queryManager = require('../QueryManager')
const admin = require('firebase-admin')
const serviceAccount = require('../../emall-b53e5-firebase-adminsdk-ztnob-ef034764f2.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

/**
 * This code is used to notify users when their reservations have ended. It first retrieves all reservations that have ended and haven't been notified yet using the queryManagerInterface. It then creates a payload with a notification title and body. Finally, it sends the notification to each user's device using the admin messaging service, logging success or failure of the message.
 */
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
            admin.messaging().sendToDevice(token.notificationToken, payload).then((res) => console.log(`Sent a notification to ${token.notificationToken}`))
                .catch((error) => {
                    console.log('Error sending message:', error);
                })
        }
    })
}

module.exports = notifyUsers
