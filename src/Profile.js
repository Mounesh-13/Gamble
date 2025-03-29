import React, { useState, useEffect } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
          method: "GET",
          credentials: "include", // Ensures cookies/session are sent
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div style={styles.container}>Loading profile...</div>;
  }

  if (error) {
    return <div style={{ ...styles.container, color: 'red' }}>Error: {error}</div>;
  }

  if (!user) {
    return <div style={styles.container}>Profile not available.</div>;
  }

  return (
    <div style={styles.container}>
      <h2>User Profile</h2>
      <div style={{ marginTop: '20px' }}>
        <p style={styles.text}><strong>Email:</strong> {user.email}</p>
        <p style={styles.text}><strong>Balance:</strong> ${user.balance}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  text: {
    marginBottom: '10px',
  },
};

export default Profile;
