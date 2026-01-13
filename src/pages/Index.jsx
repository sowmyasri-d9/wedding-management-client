import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/IndexAnimation.css";

const Index = () => {
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show buttons after 3 seconds
    const buttonTimer = setTimeout(() => {
      setShowButtons(true);
    }, 3000);

    // Cleanup timers
    return () => {
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        background:
          "url('https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg') no-repeat center center/cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        zIndex: 2,
        flexDirection: "column",
      }}
    >
      <>
        <div className="welcome-text">
          Welcome!
        </div>
        <div className="welcome-text">
          Plan Your Dream Wedding With US
        </div>
      </>
      {showButtons && (
        <div style={{ display: "flex", marginTop: "20px" }}>
          <button
            style={{
              padding: "10px 20px",
              margin: "10px",
              fontSize: "1rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: "#ff4081",
              color: "white",
              opacity: showButtons ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            style={{
              padding: "10px 20px",
              margin: "10px",
              fontSize: "1rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: "#ff4081",
              color: "white",
              opacity: showButtons ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
