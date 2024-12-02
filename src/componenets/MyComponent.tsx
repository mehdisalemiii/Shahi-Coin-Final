// components/MyComponent.tsx
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useUser } from '@supabase/auth-helpers-react';
import React from 'react';




function MyComponent() {
    const user = useUser();
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function fetchUserData() {
          if (!user || !user.id) {
            setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/userData?id=${user.id}`); // Use user.id, not user?.id
                if (!response.ok) {  // Check if the response is ok
                    const errorData = await response.json();
                    const errorMessage = errorData?.error || 'Failed to fetch user data from API';
                    throw new Error(errorMessage); // Throw error with message from API or generic message
                }

                const data = await response.json();


                if (!data || data.length === 0) {
                    setError('User not found in database.');
                } else {
                    setUserData(data[0]);
                }
            } catch (error: any) { // Add type annotation
                console.error('Error fetching user data:', error);
                setError(error.message); // Set error message from caught error
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, [user]);

    if (loading) {
        return <div>Loading user data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Check if userData exists BEFORE trying to access it
    if (!userData || !user) {  
      return <div>User data not available or user not logged in.</div>;
    }


    return (
        <div>
            <p>User ID: {user.id}</p> 
            <p>Email: {user.email}</p>
            <p>Telegram ID: {userData.telegram_id}</p>
            <p>Points: {userData.points}</p>
        </div>
    );
}

export default MyComponent;

