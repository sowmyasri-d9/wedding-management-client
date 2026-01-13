import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Receipt = () => {
  const location = useLocation();
  const { selectedDetails } = location.state || {};
  const [showDetails, setShowDetails] = useState(false);

  // Simulate a delay to show details after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 2000); // 2 seconds delay
    return () => clearTimeout(timer);
  }, []);

  if (!selectedDetails) {
    return <p>No receipt details found. Please go back and try again.</p>;
  }

  const { food, venue, dj, photography, decorators, totalCost, email } =
    selectedDetails;

  // Inline styles
  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f4f4f4",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      margin: 0,
    },
    receiptContainer: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      textAlign: "center",
    },
    tickMark: {
      fontSize: "50px",
      color: "green",
    },
    receiptDetails: {
      marginTop: "20px",
      textAlign: "left",
      display: showDetails ? "block" : "none", // Show/hide details based on state
    },
    receiptDetailsP: {
      margin: "10px 0",
    },
    printButton: {
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    printButtonHover: {
      backgroundColor: "#218838",
    },
  };

  // Get current date for payment date
  const paymentDate = new Date().toLocaleDateString();

  return (
    <div style={styles.body}>
      <div style={styles.receiptContainer}>
        {/* Tick Mark */}
        <div style={styles.tickMark}>✔</div>
        <h2>Payment Successful!</h2>

        {/* Receipt Details (Conditionally Rendered) */}
        <div style={styles.receiptDetails} id="receiptDetails">
          <p style={styles.receiptDetailsP}>
            <strong>Email:</strong> {email}
          </p>
          {food && (
            <p style={styles.receiptDetailsP}>
              <strong>Food:</strong> {food.name} - ${food.cost}
            </p>
          )}
          {venue && (
            <p style={styles.receiptDetailsP}>
              <strong>Venue:</strong> {venue.name} - ${venue.cost}
            </p>
          )}
          {dj && (
            <p style={styles.receiptDetailsP}>
              <strong>DJ:</strong> {dj.name} - ${dj.cost}
            </p>
          )}
          {photography && (
            <p style={styles.receiptDetailsP}>
              <strong>Photography:</strong> {photography.name} - ${photography.cost}
            </p>
          )}
          {decorators && (
            <p style={styles.receiptDetailsP}>
              <strong>Decorators:</strong> {decorators.name} - ${decorators.cost}
            </p>
          )}
          <p style={styles.receiptDetailsP}>
            <strong>Total Cost:</strong> ${totalCost}
          </p>
          <p style={styles.receiptDetailsP}>
            <strong>Payment Date:</strong> {paymentDate}
          </p>
        </div>

        {/* Print Button */}
        <button style={styles.printButton} onClick={() => window.print()}>
          Print Receipt
        </button>
      </div>

      {/* Play a success sound from an external URL */}
      <audio autoPlay>
        <source
          src="https://www.soundjay.com/buttons/sounds/button-3.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Receipt;
