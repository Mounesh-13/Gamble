import React, { useState, useEffect } from 'react';
import './CoinFlip.css'; // Import your CSS file
import Wallet from './wallet'; //Import the wallet component.

function CoinFlip() {
  const [choice, setChoice] = useState(null);
  const [betAmount, setBetAmount] = useState('');
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [balance, setBalance] = useState(100); //Default balance for testing, replace with wallet value.
  const [error, setError] = useState(null);

  const flipCoin = () => {
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
    setTimeout(() => {
      const random = Math.random();
      const outcome = random < 0.5 ? 'heads' : 'tails';
      setResult(outcome);
      setFlipping(false);

      if (choice === outcome) {
        setBalance(balance + parseFloat(betAmount));
      } else {
        setBalance(balance - parseFloat(betAmount));
      }
    }, 2000); // Simulate flip animation (2 seconds)
  };

  return (
    <div className="coin-flip-container">
      <Wallet balance={balance}/>
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