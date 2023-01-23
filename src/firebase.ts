import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getMessaging, getToken, Messaging,  } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDISfT_jx0hkD-SDgy5Z8tlPVT79dNEdXg",
  authDomain: "vue-http-learning-b7e81.firebaseapp.com",
  databaseURL: "https://vue-http-learning-b7e81-default-rtdb.firebaseio.com",
  projectId: "vue-http-learning-b7e81",
  storageBucket: "vue-http-learning-b7e81.appspot.com",
  messagingSenderId: "512051751261",
  appId: "1:512051751261:web:5ae2d5b116bbeed2efe0b4",
  measurementId: "G-Y2567YKSGH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
// const messaging = getMessaging(app);

// function requestPermission() {
//   // console.log('Requesting permission...');
//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       // console.log('Notification permission granted.');
//       getToken(messaging, { vapidKey: 'BO4apUIK8YveU7oSf8QdysYObEHYnp5jp-ezxHvaKSzXs7IU12d_ZM4rgMA7ecUBr3YygkZdTDOzd5SdpSl7yp4' }).then((currentToken) => {
//           if (currentToken) {
//               // console.log('current token: ', currentToken);
//           } else {
//               console.log('No registration token available. Request permission to generate one.');
//           }
//           }).catch((err) => {
//               console.log('An error occurred while retrieving token. ', err);
//           });
//     }
//   })
// }
// requestPermission()

export { db, storage, analytics }
