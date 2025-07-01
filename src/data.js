import {
    doc,
    setDoc,
    updateDoc,
    collection,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { db } from "./firebaseSetup.js";

/**
 * Initializes the subject data in the Firestore database.
 * @param {object} game - The game object.
 */
export function initSubject(game) {
    // Create a reference to the subject's document in the database
    const docRef = doc(
        db,
        "tasks",
        "new_task",
        "subjects",
        game.config.uid
    );

    // Set the initial data for the subject
    setDoc(docRef, {
        subjectID: game.registry.get("subjectID"),  // Prolific subject ID
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        trial_data: [],
        attention_checks: [],
    })
        .then(() => {
            console.log("Subject data successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

/**
 * Saves the trial data to the Firestore database.
 * @param {object} game - The game object.
 */
export function saveData(game) {
    // Get a reference to the document in the Firestore database
    const docRef = doc(
        db,
        "tasks",
        "new_task",
        "subjects",
        game.config.uid
    );

    // Update the document with the trial data
    updateDoc(docRef, {
        trial_data: game.registry.get("data"),
    })
        .then(() => {
            // Log a success message when the data is successfully updated
            console.log("Trial data successfully updated!");
        })
        .catch((error) => {
            // Log an error message if there is an error updating the document
            console.error("Error updating document: ", error);
        });
}
