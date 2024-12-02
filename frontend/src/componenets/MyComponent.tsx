import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDoc, doc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';

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

  interface UserData {
    first: string;
    last: string;
    born: number;
    // Add other properties as needed
  }
  
function MyComponent() {
  const [userData, setUserData] = useState<UserData | null>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
        const docRef = doc(db, "users", "correct-document-id"); // Replace with actual document ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        setError(error as Error);
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

      {loading && <p>Loading user data...</p>}
      {error && <p>Error: {error.message}</p>}
      {userData && (
        <div>
          <p>Name: {userData.first} {userData.last}</p>
          {/* Display other user data */}
        </div>
      )}
    </div>
  );
}

export default MyComponent;

