const queryManager = require('../QueryManager')
const admin = require('firebase-admin')
const fs = require('fs')

const initializeApp = () => {
    if (!fs.existsSync('./emall-b53e5-firebase-adminsdk-ztnob-ef034764f2.json')) return // If the firebase admin key doesn't exist, don't initialize the messaging service
    admin.initializeApp({
        credential: admin.credential.cert(require('../../emall-b53e5-firebase-adminsdk-ztnob-ef034764f2.json')),
    })
}

initializeApp()

/**
 * This code is used to notify users when their reservations have ended. It first retrieves all reservations that have ended and haven't been notified yet using the queryManagerInterface. It then creates a payload with a notification title and body. Finally, it sends the notification to each user's device using the admin messaging service, logging success or failure of the message.
 */
const notifyUsers = async () => {
    if (!fs.existsSync('./emall-b53e5-firebase-adminsdk-ztnob-ef034764f2.json')) return // If the firebase admin key doesn't exist, don't send notifications
    // Retrieve all reservations that have ended and haven't been notified yet
    const queryManagerInterface = await queryManager.getQueryManager()
    const tokens = await queryManagerInterface.getMessagingTokenReservationsEnded()
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
