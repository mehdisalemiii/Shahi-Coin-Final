import React, { useState, useEffect, useRef } from 'react';
import {getFirestore , collection, addDoc } from "firebase/firestore"; 
import { initializeApp } from 'firebase/app'; // Import initializeApp

const firebaseConfig = {
  apiKey: "AIzaSyA2fG-gA-Dok_BRe9td_5Ale8suDa_Tm0s",
  authDomain: "shahcoin.firebaseapp.com",
  databaseURL: "https://shahcoin-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shahcoin",
  storageBucket: "shahcoin.appspot.com",
  messagingSenderId: "654652281473",
  appId: "1:654652281473:web:c4b31ed4975cde3e9e7380"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const usersCollection = collection(db, 'users'); // Replace 'users' with your collection name

const newUserData = { name: 'John Doe', age: 30 };
addDoc(usersCollection, newUserData)
  .then((docRef) => {
    console.log('Document written with ID:', docRef.id);
  })
  .catch((error) => {
    console.error('Error adding document:', error);
  });
  
function MyComponent() {
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null); // Type error as Error

  const handleAddUser = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ... your Firestore fetching logic here ...
      } catch (error) {
        setError(error as Error); // Type assertion for error
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); 

  const handleUserClick = async () => {
    // ... your reCAPTCHA handling logic ...
  };

  return (
    <div>
      <button onClick={handleUserClick}>Click Me</button>
      <button onClick={handleAddUser}>Add User</button>

      {/* Now include the loading/error/data display within the SAME return block */}
      {loading && <p>Loading user data...</p>}
      {error && <p>Error: {error.message}</p>}
      {userData && (
        <div>
          <p>Name: {userData.name}</p> 
          {/* ... display other user data ... */}
        </div>
      )}
    </div>
  ); // Only ONE return statement within the function
}

export default MyComponent;
