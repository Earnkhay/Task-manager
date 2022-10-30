// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth'
import firebase from 'firebase'
import 'firebase/firestore'
// import 'firebase/firebase-auth'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDISfT_jx0hkD-SDgy5Z8tlPVT79dNEdXg",
  authDomain: "vue-http-learning-b7e81.firebaseapp.com",
  databaseURL: "https://vue-http-learning-b7e81-default-rtdb.firebaseio.com",
  projectId: "vue-http-learning-b7e81",
  storageBucket: "vue-http-learning-b7e81.appspot.com",
  messagingSenderId: "512051751261",
  appId: "1:512051751261:web:5ae2d5b116bbeed2efe0b4"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
// const usersCollection = db.collection('users')



export { fb, db }