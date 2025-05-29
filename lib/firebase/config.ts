// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyCfeBhzKYca2A2XiKmYp8-1gwFsAD9BkfI",
 authDomain: "codetopup-b8b94.firebaseapp.com",
 projectId: "codetopup-b8b94",
 storageBucket: "codetopup-b8b94.firebasestorage.app",
 messagingSenderId: "584551740859",
 appId: "1:584551740859:web:fb6fc34dcdadefcedc809e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db, app};
