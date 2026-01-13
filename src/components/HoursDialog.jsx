import React from "react";

const HoursDialog = ({ selectedHours, onHoursChange, onClose, onSubmit }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h3>Select Hours</h3>
        <select
          value={selectedHours}
          onChange={(e) => onHoursChange(Number(e.target.value))}
          style={{ padding: "5px", marginBottom: "10px" }}
        >
          {[2, 4, 6, 8, 10].map((hour) => (
            <option key={hour} value={hour}>
              {hour} hours
            </option>
          ))}
        </select>
        <br />
        <button
          style={{
            padding: "5px 10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={onSubmit}
        >
          Confirm
        </button>
        <button
          style={{
            padding: "5px 10px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginLeft: "10px",
          }}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default HoursDialog;
