// /src/firebase/firebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {  
  apiKey: "AIzaSyDcmZp1HZgiPERNf1iqDpxzJ5-wUfjEO94",
authDomain: "mechcoders-13fe5.firebaseapp.com",
projectId: "mechcoders-13fe5",
storageBucket: "mechcoders-13fe5.firebasestorage.app",
messagingSenderId: "715891186804",
appId: "1:715891186804:web:9f649c0e96751a51438521"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and export it
const auth = getAuth(app);

export { auth, app };

