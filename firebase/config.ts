// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyC3-VL70gOVnekyahvycGfWd4hf5kGeeUo',
    authDomain: 'bookwormlab4.firebaseapp.com',
    projectId: 'bookwormlab4',
    storageBucket: 'bookwormlab4.appspot.com',
    messagingSenderId: '794108319972',
    appId: '1:794108319972:web:c908f85fd0c00613c274f1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
export const firebaseDB = getFirestore(app)
