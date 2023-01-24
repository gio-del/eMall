import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyAv2gmZCuO_UUXPJF8WjZDnZh0-njMM2-8",
    authDomain: "emall-b53e5.firebaseapp.com",
    projectId: "emall-b53e5",
    storageBucket: "emall-b53e5.appspot.com",
    messagingSenderId: "691467551189",
    appId: "1:691467551189:web:03c83abbb6f38d30adfd5c",
    measurementId: "G-288NY5Z3GD"
}

export const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app)