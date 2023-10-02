// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

import { getAnalytics, isSupported } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDToWzEJgsSMqwUqT35wzXzp58arLVuUec",
  authDomain: "miprode-2023.firebaseapp.com",
  projectId: "miprode-2023",
  storageBucket: "miprode-2023.appspot.com",
  messagingSenderId: "108171770595",
  appId: "1:108171770595:web:44bcc3bab8938eccb5a3d6",
  measurementId: "G-5VZT56R5H3",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export default app
