import React, { useState, useEffect } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching user profile (replace with backend fetch later)
    const simulateFetch = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate successful fetch with default user data
        const defaultUser = {
          email: 'testuser@example.com',
          password: 'defaultPassword123', // In a real app, NEVER store or display plain text passwords.
        };
        setUser(defaultUser);
      } catch (err) {
        setError(err.message || 'Failed to simulate fetch profile.');
      } finally {
        setLoading(false);
      }
    };

    simulateFetch();

    // Replace simulateFetch with your actual fetch when backend is ready:
    /*
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/profile'); // Replace with your backend endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    */
  }, []);

  if (loading) {
    return <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'center', fontStyle: 'italic', color: '#555' }}>Loading profile...</div>;
  }

  if (error) {
    return <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  }

  if (!user) {
    return <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'left' }}>Profile not available.</div>;
  }

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'left' }}>
      <h2>User Profile</h2>
      <div style={{ marginTop: '20px' }}>
        <p style={{ marginBottom: '10px' }}>
          <strong>Email:</strong> {user.email}
        </p>
        <p style={{ marginBottom: '10px' }}>
          <strong>Password:</strong> {user.password} {/* In a real app, NEVER display plain text passwords. */}
        </p>
      </div>
    </div>
  );
}

export default Profile;