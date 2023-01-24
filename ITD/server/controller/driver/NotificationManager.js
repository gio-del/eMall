const queryManager = require('../QueryManager')
const admin = require('firebase-admin')

const firebaseConfig = {
    apiKey: "AIzaSyAv2gmZCuO_UUXPJF8WjZDnZh0-njMM2-8",
    authDomain: "emall-b53e5.firebaseapp.com",
    projectId: "emall-b53e5",
    storageBucket: "emall-b53e5.appspot.com",
    messagingSenderId: "691467551189",
    appId: "1:691467551189:web:03c83abbb6f38d30adfd5c",
    measurementId: "G-288NY5Z3GD"
}

admin.initializeApp(firebaseConfig)

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
            admin.messaging().sendToDevice(token.notificationToken, payload)
                .catch((error) => {
                    console.log('Error sending message:', error);
                })
        }
    })
}
module.exports = notifyUsers
