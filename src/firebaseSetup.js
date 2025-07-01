// Importing necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
    getAuth,
    signInAnonymously,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getFirestore, enableNetwork, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import firebaseConfig from "./firebaseConfig.js";

// Your web app's Firebase configuration object
// const firebaseConfig = {
//   apiKey: "your-api-key",
//   authDomain: "your-auth-domain",
//   projectId: "your-project-id",
//   storageBucket: "your-storage-bucket",
//   messagingSenderId: "your-messaging-sender-id",
//   appId: "your-app-id",
// };

// Initialize Firebase with the config object
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Enable Firestore offline data persistence
enableIndexedDbPersistence(db)
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          console.warn('The current browser does not support persistence features.');
      }
  });

// Function to sign in the user and return a promise that resolves with the user's uid
export function signInAndGetUid() {
    return new Promise((resolve, reject) => {
        signInAnonymously(auth).catch((error) => {
            console.error(error.code);
            console.error(error.message);
            document.body.innerHTML = `
            <div id="mainDiv">
              <div class="jspsych-display-element">
                <h1>Oops</h1>
                Looks like there's a problem! Try hard refreshing your browser (Ctrl + F5).
                <br><br>
                Thank you!
              </div>
            </div>`;
            reject(error);
        });

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                resolve(uid); // Resolve the promise with the uid
            }
        });
    });
}

// Exporting auth, and db so that they can be used in other files
export { auth, db };
