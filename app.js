import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
doc,
setDoc,
getDoc,
collection,
getDocs,
onSnapshot
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyAjbUW16bJwLLsBcRn8l9oLjK6TNSIL1sg",
authDomain: "fantasy-tour-france.firebaseapp.com",
projectId: "fantasy-tour-france",
storageBucket: "fantasy-tour-france.firebasestorage.app",
messagingSenderId: "101503786956",
appId: "1:101503786956:web:e4d45d9b1ab1553b910769",
measurementId: "G-0N2HFCYVEE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const players = [
"Val",
"Tits",
"Tote",
"Vic",
