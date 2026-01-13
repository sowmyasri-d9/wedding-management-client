import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../http";

const MakeAdmin = () => {
  const [email, setEmail] = useState(""); // State to store the email input
  const navigate = useNavigate();

  const handleMakeAdmin = async () => {
    if (!email) {
      alert("Please enter an email.");
      return;
    }

    try {
      // Fetch the user by email
      const response = await http.get(`/users/email/${email}`);
      const user = response.data.data;

      if (!user) {
        alert("User not found.");
        return;
      }

      if (user.admin) {
        alert(`User with email ${email} is already an admin.`);
        navigate(`/admin`);
      }

      // Update the user's admin status
      const updateResponse = await http.patch(`/users/${user._id}/make-admin`, { admin: true });
      if (updateResponse.status === 200) {
        alert(`User with email ${email} is now an admin.`);
        navigate(`/admin`);
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error making user an admin:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        backgroundColor: "#f5f5f5", // Light gray background for the page
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.8rem"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Make User an Admin</h2>
        <input
          type="email"
          placeholder="Enter user's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "20px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleMakeAdmin}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#007bff", // Default button color
            color: "white",
            border: "none",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Make Admin
        </button>
      </div>
    </div>
  );
};

export default MakeAdmin;