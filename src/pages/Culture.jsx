import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../http";

const Culture = () => {
  const navigate = useNavigate();
  const [weddingCultures, setWeddingCultures] = useState([]);

  useEffect(() => {
    const getWeddingCultures = async () => {
      try {
        const response = await http.get("/wedding-types");

        if (response.status === 200) {
          setWeddingCultures(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getWeddingCultures();
  }, []);

  const redirectTo = (wedding) => {
    // Navigate to Dashboard with the selected wedding as state
    navigate("/dashboard", { state: { selectedWedding: wedding } });
  };

  // Inline styles
  const styles = {
    body: {
      fontFamily: "'Poppins', sans-serif",
      textAlign: "center",
      backgroundColor: "#f4f4f4",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    h1: {
      margin: "20px auto",
      width: "90%",
      color: "white",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: "15px 30px",
      borderRadius: "12px",
      textTransform: "uppercase",
      fontSize: "28px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      gap: "20px",
    },
    wedding: {
      position: "relative",
      width: "75vw",
      height: "75vh",
      overflow: "hidden",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      display: "flex",
    },
    weddingHover: {
      transform: "scale(1.05)",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "12px",
    },
    label: {
      position: "absolute",
      bottom: "15px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      color: "white",
      padding: "10px 20px",
      fontSize: "20px",
      fontWeight: "bold",
      borderRadius: "6px",
      textTransform: "uppercase",
    },
    weddingOdd: {
      alignSelf: "flex-start",
    },
    weddingEven: {
      alignSelf: "flex-end",
    },
  };

  return (
    <div style={styles.body}>
      <h1 style={styles.h1}>CHOOSE YOUR WEDDING TYPE</h1>
      <div style={styles.container}>
        {weddingCultures.map((wedding, index) => (
          <div
            key={wedding._id}
            style={{
              ...styles.wedding,
              ...(index % 2 === 0 ? styles.weddingOdd : styles.weddingEven),
            }}
            onClick={() => redirectTo(wedding)} // Pass the entire wedding object
          >
            <img src={wedding.img_url} alt={wedding.type} style={styles.img} />
            <div style={styles.label}>{wedding.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Culture;