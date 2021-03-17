import firebase from 'firebase';
import "firebase/firestore";
import "firebase/storage";


const config ={
    apiKey: "AIzaSyDmeugNLi2gO_u9O-JL6XuLicscPcrZ3xM",
    authDomain: "momenku-864ef.firebaseapp.com",
    databaseURL: "https://momenku-864ef.firebaseio.com",
    projectId: "momenku-864ef",
    storageBucket: "momenku-864ef.appspot.com",
    messagingSenderId: "306733199711",
    appId: "1:306733199711:web:6fdcef2e73b89fc10486ea",
    measurementId: "G-GQSZNS8E14"
}

firebase.initializeApp(config);
const storage = firebase.storage();
export {storage, firebase as default};