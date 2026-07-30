import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDpHGytH7ZMjNcSGM45ujLxu5LrTHf3jlg",
    authDomain: "chesschan-8f1bf.firebaseapp.com",
    projectId: "chesschan-8f1bf",
    storageBucket: "chesschan-8f1bf.firebasestorage.app",
    messagingSenderId: "24274267038",
    appId: "1:24274267038:web:7e1b3603f28d5499d1448f",
    measurementId: "G-4XGRYGC75W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const googleLoginBtn = document.getElementById("google-login");
if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            alert(err.message);
        }
    });
}

const guestLoginBtn = document.getElementById("guest-login");
if (guestLoginBtn) {
    guestLoginBtn.addEventListener("click", async () => {
        try {
            await signInAnonymously(auth);
        } catch (err) {
            alert(err.message);
        }
    });
}

onAuthStateChanged(auth, (user) => {
    if (!user) return;

    console.log("Logged in as:", user.displayName ?? "Guest");

    window.location.href = "play.html";
});
