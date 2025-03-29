import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./header";
import Profile from "./Profile";
import CoinFlip from "./CoinFlip";
import AuthPage from "./AuthPage";
import Wallet from "./wallet";
import NotFoundPage from "./NotFoundPage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyUser = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/verify`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth verification failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      window.location.href = "/login";
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      {user && <Header onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={user ? <CoinFlip /> : <Navigate to="/login" replace />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/profile/wallet" element={user ? <Wallet /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!user ? <AuthPage onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
