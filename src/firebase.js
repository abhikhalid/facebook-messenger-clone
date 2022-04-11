import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCwYhD8dXV-m2b7JmT7Pj-1IzHl1aIRYq8",
  authDomain: "facebook-messenger-clone-86a7b.firebaseapp.com",
  projectId: "facebook-messenger-clone-86a7b",
  storageBucket: "facebook-messenger-clone-86a7b.appspot.com",
  messagingSenderId: "432018710387",
  appId: "1:432018710387:web:7c34b74691b3c8efeb6f06"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;