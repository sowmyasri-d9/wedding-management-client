// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { selectedDetails } = location.state || {};

//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   if (!selectedDetails) {
//     return <p>No payment details found. Please go back and try again.</p>;
//   }

//   const { food, venue, dj, photography, decorators, totalCost, email } =
//     selectedDetails;

//   console.log("FOOD", venue);

//   // Function to validate card details
//   const validateCardDetails = () => {
//     let isValid = true;

//     // Validate card number (must be 16 digits)
//     if (!/^\d{16}$/.test(cardNumber)) {
//       setErrorMessage("Please enter a valid 16-digit card number.");
//       isValid = false;
//     }

//     // Validate expiry date (must be in MM/YY format and not expired)
//     const [month, year] = expiryDate.split("/");
//     if (!month || !year || month.length !== 2 || year.length !== 2) {
//       setErrorMessage("Please enter a valid expiry date in MM/YY format.");
//       isValid = false;
//     } else {
//       const currentDate = new Date();
//       const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of the year
//       const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JavaScript

//       if (
//         parseInt(year) < currentYear ||
//         (parseInt(year) === currentYear && parseInt(month) < currentMonth)
//       ) {
//         setErrorMessage("Your card is expired. Please use a valid card.");
//         isValid = false;
//       }
//     }

//     // Validate CVV (must be 3 digits)
//     if (!/^\d{3}$/.test(cvv)) {
//       setErrorMessage("Please enter a valid 3-digit CVV.");
//       isValid = false;
//     }

//     return isValid;
//   };

//   // Handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Validate card details
//     if (!validateCardDetails()) {
//       return; // Prevent form submission if validation fails
//     }

//     // Simulate a successful payment
//     alert("Payment successful! Redirecting to receipt...");

//     // Navigate to the PaymentReceipt component with selectedDetails
//     navigate("/receipt", {
//       state: { selectedDetails: { ...selectedDetails, totalCost } },
//     });
//   };

//   // Inline styles (same as before)
//   const styles = {
//     body: {
//       fontFamily: "Arial, sans-serif",
//       backgroundColor: "#f9f9f9",
//       margin: 0,
//       padding: 0,
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       minHeight: "100vh",
//       padding: "20px",
//     },
//     paymentContainer: {
//       backgroundColor: "#fff",
//       borderRadius: "8px",
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//       width: "800px",
//       padding: "20px",
//     },
//     heading: {
//       marginTop: 0,
//       fontSize: "24px",
//       color: "#333",
//       textAlign: "center",
//     },
//     cartItem: {
//       display: "flex",
//       alignItems: "center",
//       marginBottom: "20px",
//       padding: "10px",
//       borderBottom: "1px solid #eee",
//     },
//     cartItemImage: {
//       width: "80px",
//       height: "80px",
//       borderRadius: "8px",
//       marginRight: "20px",
//     },
//     cartItemDetails: {
//       flex: 1,
//     },
//     cartItemName: {
//       margin: 0,
//       fontSize: "18px",
//       color: "#333",
//     },
//     cartItemPrice: {
//       margin: "5px 0",
//       color: "#666",
//     },
//     totalCost: {
//       textAlign: "right",
//       marginTop: "20px",
//     },
//     paymentForm: {
//       marginTop: "20px",
//     },
//     label: {
//       display: "block",
//       marginBottom: "8px",
//       fontWeight: "bold",
//       color: "#555",
//     },
//     input: {
//       width: "100%",
//       padding: "10px",
//       marginBottom: "16px",
//       border: "1px solid #ddd",
//       borderRadius: "4px",
//       fontSize: "16px",
//     },
//     inputFocus: {
//       borderColor: "#007bff",
//       outline: "none",
//     },
//     button: {
//       width: "100%",
//       padding: "12px",
//       backgroundColor: "#007bff",
//       color: "#fff",
//       border: "none",
//       borderRadius: "4px",
//       fontSize: "16px",
//       cursor: "pointer",
//     },
//     buttonHover: {
//       backgroundColor: "#0056b3",
//     },
//     errorMessage: {
//       color: "#dc3545",
//       fontSize: "14px",
//       marginTop: "10px",
//       display: errorMessage ? "block" : "none",
//     },
//   };

//   return (
//     <div style={styles.body}>
//       <div style={styles.paymentContainer}>
//         <h2 style={styles.heading}>Review Your Selections</h2>

//         {/* Cart Section */}
//         <div>
//           {/* Food Selection */}
//           {food && (
//             <div style={styles.cartItem}>
//               <img src={food.image_url} alt={food.name} style={styles.cartItemImage} />
//               <div style={styles.cartItemDetails}>
//                 <h3 style={styles.cartItemName}>{food.name}</h3>
//                 <p style={styles.cartItemPrice}>Price: ${food.cost}</p>
//               </div>
//             </div>
//           )}

//           {/* Venue Selection */}
//           {venue && (
//             <div style={styles.cartItem}>
//               <img src={venue.image} alt={venue.name} style={styles.cartItemImage} />
//               <div style={styles.cartItemDetails}>
//                 <h3 style={styles.cartItemName}>{venue.name}</h3>
//                 <p style={styles.cartItemPrice}>Price: ${venue.cost}</p>
//               </div>
//             </div>
//           )}

//           {/* DJ Selection */}
//           {dj && (
//             <div style={styles.cartItem}>
//               <img src={dj.image} alt={dj.name} style={styles.cartItemImage} />
//               <div style={styles.cartItemDetails}>
//                 <h3 style={styles.cartItemName}>{dj.name}</h3>
//                 <p style={styles.cartItemPrice}>Price: ${dj.cost}</p>
//               </div>
//             </div>
//           )}

//           {/* Photography Selection */}
//           {photography && (
//             <div style={styles.cartItem}>
//               <img
//                 src={photography.image}
//                 alt={photography.name}
//                 style={styles.cartItemImage}
//               />
//               <div style={styles.cartItemDetails}>
//                 <h3 style={styles.cartItemName}>{photography.name}</h3>
//                 <p style={styles.cartItemPrice}>Price: ${photography.cost}</p>
//               </div>
//             </div>
//           )}

//           {/* Decorators Selection */}
//           {decorators && (
//             <div style={styles.cartItem}>
//               <img
//                 src={decorators.image}
//                 alt={decorators.name}
//                 style={styles.cartItemImage}
//               />
//               <div style={styles.cartItemDetails}>
//                 <h3 style={styles.cartItemName}>{decorators.name}</h3>
//                 <p style={styles.cartItemPrice}>Price: ${decorators.cost}</p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Total Cost */}
//         <div style={styles.totalCost}>
//           <h3>Total: ${totalCost}</h3>
//         </div>

//         {/* Payment Form */}
//         <div style={styles.paymentForm}>
//           <h2 style={styles.heading}>Payment Details</h2>
//           <form id="paymentForm" onSubmit={handleSubmit}>
//             {/* Card Number */}
//             <label htmlFor="cardNumber" style={styles.label}>
//               Card Number
//             </label>
//             <input
//               type="text"
//               id="cardNumber"
//               name="cardNumber"
//               placeholder="1234 5678 9012 3456"
//               required
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//               style={styles.input}
//             />

//             {/* Expiry Date */}
//             <label htmlFor="expiryDate" style={styles.label}>
//               Expiry Date
//             </label>
//             <input
//               type="text"
//               id="expiryDate"
//               name="expiryDate"
//               placeholder="MM/YY"
//               required
//               value={expiryDate}
//               onChange={(e) => setExpiryDate(e.target.value)}
//               style={styles.input}
//             />

//             {/* CVV */}
//             <label htmlFor="cvv" style={styles.label}>
//               CVV
//             </label>
//             <input
//               type="text"
//               id="cvv"
//               name="cvv"
//               placeholder="123"
//               required
//               value={cvv}
//               onChange={(e) => setCvv(e.target.value)}
//               style={styles.input}
//             />

//             {/* Hidden Email Field */}
//             <input type="hidden" name="email" value={email} />

//             {/* Submit Button */}
//             <button type="submit" style={styles.button}>
//               Pay Now
//             </button>
//           </form>

//           {/* Error Message */}
//           <div id="errorMessage" style={styles.errorMessage}>
//             {errorMessage}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDetails } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!selectedDetails) {
    return <p>No payment details found. Please go back and try again.</p>;
  }

  const { food, venue, dj, photography, decorators, totalCost, email } =
    selectedDetails;

  // Function to validate card details
  const validateCardDetails = () => {
    let isValid = true;

    // Validate card number (must be 16 digits)
    if (!/^\d{16}$/.test(cardNumber)) {
      setErrorMessage("Please enter a valid 16-digit card number.");
      isValid = false;
    }

    // Validate expiry date (must be in MM/YY format and not expired)
    const [month, year] = expiryDate.split("/");
    if (!month || !year || month.length !== 2 || year.length !== 2) {
      setErrorMessage("Please enter a valid expiry date in MM/YY format.");
      isValid = false;
    } else {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of the year
      const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JavaScript

      if (
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        setErrorMessage("Your card is expired. Please use a valid card.");
        isValid = false;
      }
    }

    // Validate CVV (must be 3 digits)
    if (!/^\d{3}$/.test(cvv)) {
      setErrorMessage("Please enter a valid 3-digit CVV.");
      isValid = false;
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate card details
    if (!validateCardDetails()) {
      return; // Prevent form submission if validation fails
    }

    // Simulate a successful payment
    alert("Payment successful! Redirecting to receipt...");

    // Navigate to the PaymentReceipt component with selectedDetails
    navigate("/receipt", {
      state: { selectedDetails: { ...selectedDetails, totalCost } },
    });
  };

  // Inline styles
  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f9",
      margin: 0,
      padding: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      padding: "20px",
    },
    paymentContainer: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "800px",
      padding: "20px",
    },
    heading: {
      marginTop: 0,
      fontSize: "24px",
      color: "#333",
      textAlign: "center",
    },
    cartItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      padding: "10px",
      borderBottom: "1px solid #eee",
    },
    cartItemImage: {
      width: "80px",
      height: "80px",
      borderRadius: "8px",
      marginRight: "20px",
    },
    cartItemDetails: {
      flex: 1,
    },
    cartItemName: {
      margin: 0,
      fontSize: "18px",
      color: "#333",
    },
    cartItemPrice: {
      margin: "5px 0",
      color: "#666",
    },
    totalCost: {
      textAlign: "right",
      marginTop: "20px",
    },
    paymentForm: {
      marginTop: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "bold",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "16px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
    },
    inputFocus: {
      borderColor: "#007bff",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    errorMessage: {
      color: "#dc3545",
      fontSize: "14px",
      marginTop: "10px",
      display: errorMessage ? "block" : "none",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.paymentContainer}>
        <h2 style={styles.heading}>Review Your Selections</h2>

        {/* Cart Section */}
        <div>
          {/* Food Selection - has cost */}
          {food && (
            <div style={styles.cartItem}>
              <img src={food.image || food.image_url} alt={food.name} style={styles.cartItemImage} />
              <div style={styles.cartItemDetails}>
                <h3 style={styles.cartItemName}>{food.name}</h3>
                {food.cost && <p style={styles.cartItemPrice}>Price: ${food.cost}</p>}
              </div>
            </div>
          )}

          {/* Venue Selection - no cost */}
          {venue && (
            <div style={styles.cartItem}>
              <img src={venue.image} alt={venue.name} style={styles.cartItemImage} />
              <div style={styles.cartItemDetails}>
                <h3 style={styles.cartItemName}>{venue.name}</h3>
              </div>
            </div>
          )}

          {/* DJ Selection - no cost */}
          {dj && (
            <div style={styles.cartItem}>
              <img src={dj.image} alt={dj.name} style={styles.cartItemImage} />
              <div style={styles.cartItemDetails}>
                <h3 style={styles.cartItemName}>{dj.name}</h3>
              </div>
            </div>
          )}

          {/* Photography Selection - no cost */}
          {photography && (
            <div style={styles.cartItem}>
              <img
                src={photography.image}
                alt={photography.name}
                style={styles.cartItemImage}
              />
              <div style={styles.cartItemDetails}>
                <h3 style={styles.cartItemName}>{photography.name}</h3>
              </div>
            </div>
          )}

          {/* Decorators Selection - has cost */}
          {decorators && (
            <div style={styles.cartItem}>
              <img
                src={decorators.image}
                alt={decorators.name}
                style={styles.cartItemImage}
              />
              <div style={styles.cartItemDetails}>
                <h3 style={styles.cartItemName}>{decorators.name}</h3>
                {decorators.cost && <p style={styles.cartItemPrice}>Price: ${decorators.cost}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Total Cost - only food and decorators */}
        <div style={styles.totalCost}>
          <h3>Total: ${totalCost}</h3>
        </div>

        {/* Payment Form */}
        <div style={styles.paymentForm}>
          <h2 style={styles.heading}>Payment Details</h2>
          <form id="paymentForm" onSubmit={handleSubmit}>
            {/* Card Number */}
            <label htmlFor="cardNumber" style={styles.label}>
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              required
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              style={styles.input}
            />

            {/* Expiry Date */}
            <label htmlFor="expiryDate" style={styles.label}>
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              required
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              style={styles.input}
            />

            {/* CVV */}
            <label htmlFor="cvv" style={styles.label}>
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="123"
              required
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              style={styles.input}
            />

            {/* Hidden Email Field */}
            <input type="hidden" name="email" value={email} />

            {/* Submit Button */}
            <button type="submit" style={styles.button}>
              Pay Now
            </button>
          </form>

          {/* Error Message */}
          <div id="errorMessage" style={styles.errorMessage}>
            {errorMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
