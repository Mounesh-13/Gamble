import React, { useState, useEffect } from 'react';
import './CoinFlip.css'; // Import your CSS file
import Wallet from './wallet'; // Import the wallet component.

function CoinFlip() {
  const [choice, setChoice] = useState(null);
  const [betAmount, setBetAmount] = useState('');
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/balance`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          setBalance(data.balance);
        } else {
          setError(data.message || 'Failed to fetch balance');
        }
      } catch (err) {
        setError('Error fetching balance');
      }
    };
    fetchBalance();
  }, []);

  const flipCoin = async () => {
    if (!choice) {
      setError('Please choose Heads or Tails.');
      return;
    }
    if (!betAmount || isNaN(betAmount) || betAmount <= 0) {
      setError('Please enter a valid bet amount.');
      return;
    }
    if (parseFloat(betAmount) > balance) {
      setError('Insufficient funds');
      return;
    }

    setError(null);
    setFlipping(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/coin/flip`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ choice, amount: parseFloat(betAmount) }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Flip failed');
      }
      
      setTimeout(() => {
        setResult(data.result);
        setBalance(data.newBalance);
        setFlipping(false);
      }, 2000); // Simulate flip animation
    } catch (err) {
      setError(err.message);
      setFlipping(false);
    }
  };

  return (
    <div className="coin-flip-container">
      <Wallet balance={balance} />
      <h2>Coin Flip Game</h2>
      <div className="choice-buttons">
        <button
          className={choice === 'heads' ? 'active' : ''}
          onClick={() => setChoice('heads')}
        >
          Heads
        </button>
        <button
          className={choice === 'tails' ? 'active' : ''}
          onClick={() => setChoice('tails')}
        >
          Tails
        </button>
      </div>
      <div className="bet-input">
        <label>Bet Amount: $</label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
        />
      </div>
      <button className="flip-button" onClick={flipCoin} disabled={flipping}>
        {flipping ? 'Flipping...' : 'Flip Coin'}
      </button>
      {result && (
        <div className="result">
          The coin landed on: {result}
          {choice === result ? <p>You win!</p> : <p>You lose!</p>}
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CoinFlip;
