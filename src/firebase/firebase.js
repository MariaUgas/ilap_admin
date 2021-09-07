import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCq5KskdpMi8_xy3RFGu7g-P5vZLS1lJZ0",
    authDomain: "ilap-noticias.firebaseapp.com",
    projectId: "ilap-noticias",
    storageBucket: "ilap-noticias.appspot.com",
    messagingSenderId: "1075333268237",
    appId: "1:1075333268237:web:f541efef7cbe9bb473a644"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  const store = fire.firestore();
  const auth = fire.auth();
  export default store;

  export {auth};
  

