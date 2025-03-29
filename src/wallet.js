import React, { useState, useEffect } from 'react';
import './App.css';

function Wallet() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/balance`, {
          method: 'GET',
          credentials: 'include',
        });
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
  }, []);

  if (loading) {
    return <div className="wallet-container loading">Loading balance...</div>;
  }

  if (error) {
    return <div className="wallet-container error">Error: {error}</div>;
  }

  return (
    <div className="wallet-container">
      <h2>Your Wallet Balance</h2>
      <p className="balance">${balance}</p>
    </div>
  );
}

export default Wallet;
