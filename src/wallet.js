import React, { useState, useEffect } from 'react';
import './App.css';

function Wallet() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching balance (replace with your actual fetch later)
    const simulateFetch = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate a delay (e.g., 1 second)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate successful fetch with a default balance
        const defaultBalance = 1234.56; // Replace with your desired default value
        setBalance(defaultBalance);
      } catch (err) {
        setError(err.message || 'Failed to simulate fetch');
      } finally {
        setLoading(false);
      }
    };

    simulateFetch();

    // When your backend is ready, replace simulateFetch with:
    /*
    const fetchBalance = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('YOUR_BACKEND_ENDPOINT');
        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }
        const data = await response.json();
        setBalance(data.balance);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
    */
  }, []);

  if (loading) {
    return <div className="wallet-container loading">Loading balance...</div>;
  }

  if (error) {
    return <div className="wallet-container error">Error: {error}</div>;
  }

  if (balance === null) {
    return <div className="wallet-container no-balance">Balance not available.</div>;
  }

  return (
    <div className="wallet-container">
      <h2>Your Wallet Balance</h2>
      <p className="balance">${balance}</p>
    </div>
  );
}

export default Wallet;