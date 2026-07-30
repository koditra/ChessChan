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

function setProfileCookie(profile) {
    const value = encodeURIComponent(JSON.stringify(profile));
    document.cookie = `chesschan-profile=${value}; path=/; max-age=31536000; SameSite=Lax`;
}

function clearProfileCookie() {
    document.cookie = "chesschan-profile=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

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

    const profile = {
        name: user.displayName || user.email?.split("@")[0] || "Guest",
        photo: user.photoURL || "https://placehold.co/48x48?text=G"
    };

    setProfileCookie(profile);
    console.log("Logged in as:", profile.name);

    window.location.href = "play.html";
});
