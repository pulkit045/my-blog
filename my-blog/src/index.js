import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyD4rwUWVfxJV2W7xCoXaYqA957ziw3SNKw",
  authDomain: "my-react-blog-3202e.firebaseapp.com",
  projectId: "my-react-blog-3202e",
  storageBucket: "my-react-blog-3202e.appspot.com",
  messagingSenderId: "1044648890754",
  appId: "1:1044648890754:web:5a1ab3bc2ebf8da847ff9b"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
