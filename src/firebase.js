import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnhj5SycCpgGaFgKwpfUsiinTygk_HNfE",
  authDomain: "simpleauth-9cf74.firebaseapp.com",
  projectId: "simpleauth-9cf74",
  storageBucket: "simpleauth-9cf74.appspot.com",
  messagingSenderId: "338233034676",
  appId: "1:338233034676:web:c3abd77d61d76c33de14e1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
