/**
 * This file has security problems. But these settings are only used for testing.
 */

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAu0299u2p9Tgtcc0U-7JELqXZ8coEq6mg",
    authDomain: "agenda-app-e9aca.firebaseapp.com",
    projectId: "agenda-app-e9aca",
    storageBucket: "agenda-app-e9aca.appspot.com",
    messagingSenderId: "132336645543",
    appId: "1:132336645543:web:5faddaed9870f017213282"
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init db and auth
const appAuth = firebase.auth()
const appFirestore = firebase.firestore()

// using firebase timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { appAuth, appFirestore, timestamp }