importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyAv2gmZCuO_UUXPJF8WjZDnZh0-njMM2-8",
    authDomain: "emall-b53e5.firebaseapp.com",
    projectId: "emall-b53e5",
    storageBucket: "emall-b53e5.appspot.com",
    messagingSenderId: "691467551189",
    appId: "1:691467551189:web:03c83abbb6f38d30adfd5c",
    measurementId: "G-288NY5Z3GD"
}


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
