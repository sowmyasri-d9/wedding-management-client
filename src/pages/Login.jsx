import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../http";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post("/auth/login", formData); // Ensure correct API path

      if (response.status === 200) {
        // Correct way to check success
        console.log("Login successful:", response.data);

        // Save token (optional: use sessionStorage for temporary storage)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("admin", response.data.admin);
        navigate("/culture");
      } else {
        setErrorMessage(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  // Inline styles
  const styles = {
    loginContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background:
        "url('https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg') no-repeat center center/cover",
      color: "white",
      margin: 0,
    },
    loginBox: {
      background: "rgba(0, 0, 0, 0.8)",
      padding: "25px",
      borderRadius: "10px",
      textAlign: "center",
      width: "300px",
      boxShadow: "0px 0px 10px rgba(255,255,255,0.3)",
    },
    h2: {
      marginBottom: "15px",
    },
    input: {
      width: "90%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "none",
      fontSize: "1rem",
    },
    button: {
      width: "100%",
      padding: "10px",
      background: "#ff4081",
      color: "white",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
      borderRadius: "5px",
      marginTop: "10px",
    },
    buttonHover: {
      background: "#f50057",
    },
    signupLink: {
      display: "block",
      marginTop: "10px",
      color: "#ff4081",
      textDecoration: "none",
      fontSize: "0.9rem",
    },
    signupLinkHover: {
      textDecoration: "underline",
    },
    errorMessage: {
      color: "#ff4081",
      fontSize: "0.9rem",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <h2 style={styles.h2}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
        <a href="/signup" style={styles.signupLink}>
          Create New Account?
        </a>
      </div>
    </div>
  );
};

export default Login;
