import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../http";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await http.post("/auth/register", formData);

      if (response.status === 201) {
        navigate("/culture");
      } else {
        setErrorMessage(response.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  // Inline styles
  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      margin: 0,
      padding: 0,
      height: "100vh",
      color: "#333",
      backgroundSize: "cover",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "url('https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg') no-repeat center center/cover",
    },
    signupContainer: {
      background: "rgba(0, 0, 0, 0.8)",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      width: "300px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%", // Ensure the form takes up the full width of the container
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // Center form elements horizontally
    },
    h2: {
      marginBottom: "20px",
      textAlign: "center",
      color: "#fff",
    },
    p: {
      color: "#fff",
    },
    input: {
      width: "100%", // Ensure inputs take up the full width of the form
      padding: "12px",
      marginBottom: "10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "1rem",
      boxSizing: "border-box", // Ensure padding is included in the width
    },
    button: {
      width: "100%", // Ensure the button takes up the full width of the form
      padding: "12px",
      backgroundColor: "#ff4081",
      color: "white",
      fontSize: "1.2rem",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      boxSizing: "border-box", // Ensure padding is included in the width
    },
    buttonHover: {
      backgroundColor: "#f50057",
    },
    signinLink: {
      marginTop: "10px",
      fontSize: "0.9rem",
      textAlign: "center",
    },
    link: {
      color: "#ff4081",
      textDecoration: "none",
    },
    linkHover: {
      textDecoration: "underline",
    },
    errorMessage: {
      color: "#ff4081",
      fontSize: "0.9rem",
      marginTop: "10px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.signupContainer}>
        <h2 style={styles.h2}>Create an Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
        <div style={styles.signinLink}>
          <p style={styles.p}>
            Already have an account?{" "}
            <a href="/login" style={styles.link}>
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
