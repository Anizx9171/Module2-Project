import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyD0kLxyBxtgevVH6uPdeWy5FqaGu7GwRh0",
    authDomain: "sign-gg-340f7.firebaseapp.com",
    projectId: "sign-gg-340f7",
    storageBucket: "sign-gg-340f7.appspot.com",
    messagingSenderId: "622750499957",
    appId: "1:622750499957:web:13079288bf022aa4cba43c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
const storage = getStorage(app)

export { storage };