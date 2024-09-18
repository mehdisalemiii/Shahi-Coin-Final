import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';


// Your Firebase configuration
const firebaseConfig = {
        apiKey: "AIzaSyA2fG-gA-Dok_BRe9td_5Ale8suDa_Tm0s",
        authDomain: "shahcoin.firebaseapp.com",
        databaseURL: "https://shahcoin-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "shahcoin",
        storageBucket: "shahcoin.appspot.com",
        messagingSenderId: "654652281473",
        appId: "1:654652281473:web:c4b31ed4975cde3e9e7380"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = getFirestore(app);

export { db ,app};

// Database structure
const usersRef = ref(database, 'users/');

// Function to create/update user data
async function handleUserClick(userId) {
  try {
    const userRef = ref(usersRef, userId);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      // User exists, update their clicks
      const currentClicks = snapshot.val().clicks || 0;
      await update(userRef, { clicks: currentClicks + 1 });
    } else {
      // New user, create their data
      await set(userRef, {
        clicks: 1,
        // Add other initial user properties here (e.g., upgrades, timestamp)
      });
    }

    console.log('User click updated successfully!');
  } catch (error) {
    console.error('Error updating user click:', error);
  }
}

// Example usage:
const userId = 'user123'; // Replace with actual user ID
handleUserClick(userId);
