import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "50px" }}>404</h1>
      <p style={{ fontSize: "20px" }}>Page Not Found</p>
      <Link to="/" style={{ fontSize: "18px", color: "blue" }}>Go Back Home</Link>
    </div>
  );
}

export default NotFoundPage;
