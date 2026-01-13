import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Budget = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract data passed via state or query parameters
  const { selectedDetails } = location.state || {};

  // State to manage visibility of budget details and buttons
  const [showBudget, setShowBudget] = useState(false);

  if (!selectedDetails) {
    return <p>No booking details found. Please go back and book again.</p>;
  }

  const { food, venue, dj, photography, decorators, email } = selectedDetails;

  // Function to calculate the total cost
  const calculateTotalCost = (selectedDetails) => {
    let total = 0;
    if (selectedDetails.food) total += selectedDetails.food.cost;
    if (selectedDetails.venue) total += selectedDetails.venue.cost;
    if (selectedDetails.dj) total += selectedDetails.dj.cost;
    if (selectedDetails.photography) total += selectedDetails.photography.cost;
    if (selectedDetails.decorators) total += selectedDetails.decorators.cost;
    return total;
  };

  const totalCost = calculateTotalCost(selectedDetails);

  // Inline styles
  const styles = {
    body: {
      background:
        "url('https://www.theweddingblissthailand.com/wp-content/uploads/2018/12/Nadear_AndrescGreg_Finck-761.jpg') no-repeat center center fixed",
      backgroundSize: "cover",
      fontFamily: "'Georgia', serif",
      color: "#4A5568",
    },
    container: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      padding: "2rem",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
      margin: "2rem auto",
    },
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      textAlign: "center",
      color: "#2D3748",
      marginBottom: "1.5rem",
    },
    detailItem: {
      marginBottom: "1.5rem",
      padding: "1rem",
      backgroundColor: "rgba(237, 242, 247, 0.8)",
      borderRadius: "8px",
    },
    detailItemH3: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: "#2D3748",
    },
    detailItemP: {
      fontSize: "1rem",
      color: "#4A5568",
    },
    totalBudget: {
      marginTop: "2rem",
      padding: "1rem",
      backgroundColor: "rgba(237, 242, 247, 0.8)",
      borderRadius: "8px",
      textAlign: "center",
    },
    totalBudgetH3: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#2D3748",
    },
    button: {
      display: "inline-block",
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
      fontWeight: "bold",
      textAlign: "center",
      color: "white",
      backgroundColor: "#4A5568",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#2D3748",
    },
    hidden: {
      display: "none",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.h1}>Your Selections</h1>

        {/* Food Details */}
        {food && (
          <div style={styles.detailItem}>
            <h3 style={styles.detailItemH3}>Food Catering: {food.name}</h3>
            <p style={styles.detailItemP}>Number of People: {food.people}</p>
          </div>
        )}

        {/* Venue Details */}
        {venue && (
          <div style={styles.detailItem}>
            <h3 style={styles.detailItemH3}>Venue: {venue.name}</h3>
            <p style={styles.detailItemP}>Number of Hours: {venue.hours}</p>
          </div>
        )}

        {/* DJ Details */}
        {dj && (
          <div style={styles.detailItem}>
            <h3 style={styles.detailItemH3}>DJ Service: {dj.name}</h3>
            <p style={styles.detailItemP}>Number of Hours: {dj.hours}</p>
          </div>
        )}

        {/* Show Budget Button */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button style={styles.button} onClick={() => setShowBudget(true)}>
            Show Budget
          </button>
        </div>

        {/* Budget Details (Conditionally Rendered) */}
        {showBudget && (
          <div>
            {food && (
              <div style={styles.detailItem}>
                <h3 style={styles.detailItemH3}>Food Cost: ${food.cost}</h3>
              </div>
            )}
            {venue && (
              <div style={styles.detailItem}>
                <h3 style={styles.detailItemH3}>Venue Cost: ${venue.cost}</h3>
              </div>
            )}
            {dj && (
              <div style={styles.detailItem}>
                <h3 style={styles.detailItemH3}>DJ Cost: ${dj.cost}</h3>
              </div>
            )}
            {photography && (
              <div style={styles.detailItem}>
                <h3 style={styles.detailItemH3}>
                  Photography Cost: ${photography.cost}
                </h3>
              </div>
            )}
            {decorators && (
              <div style={styles.detailItem}>
                <h3 style={styles.detailItemH3}>
                  Decorator Cost: ${decorators.cost}
                </h3>
              </div>
            )}
            <div style={styles.totalBudget}>
              <h3 style={styles.totalBudgetH3}>Total Cost: ${totalCost}</h3>
            </div>
          </div>
        )}

        {/* Proceed to Payment Button (Conditionally Rendered) */}
        {showBudget && (
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <button
              style={styles.button}
              onClick={() =>
                navigate("/payment", {
                  state: { selectedDetails: { ...selectedDetails, totalCost } },
                })
              }
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Budget;