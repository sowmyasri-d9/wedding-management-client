import React, { useState } from "react";

const Card = ({ item, fields, onSelect }) => {
  const [selectedHours, setSelectedHours] = useState(2);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    if (item.pricePerHour) {
      // Toggle the dropdown visibility
      setShowDropdown(!showDropdown);
    } else {
      onSelect(item); // Select the item directly if no hours are needed
    }
  };

  const handleHoursChange = (hours) => {
    setSelectedHours(hours);
    const updatedItem = {
      ...item,
      hours: hours,
      cost: item.pricePerHour * hours,
    };
    onSelect(updatedItem); // Pass the updated item with hours and cost
    setShowDropdown(false); // Hide the dropdown after selection
  };

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        margin: "10px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease",
        backgroundColor: "#fff",
        position: "relative", // Needed for dropdown positioning
      }}
      onClick={handleClick}
    >
      <img
        src={item.image_url}
        alt={item.name}
        style={{ width: "100px", height: "100px", borderRadius: "8px" }}
      />
      <div style={{ marginLeft: "10px", flex: 1 }}>
        {fields.map((field) => (
          <div key={field}>
            <strong>{field}:</strong> {item[field]}
          </div>
        ))}
      </div>

      {/* Dropdown for hours selection */}
      {item.pricePerHour && showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            padding: "10px",
            width: "100%",
          }}
        >
          <h4 style={{ margin: "0 0 10px 0" }}>Select Hours</h4>
          {[2, 4, 6, 8, 10].map((hour) => (
            <div
              key={hour}
              style={{
                padding: "5px",
                cursor: "pointer",
                backgroundColor: selectedHours === hour ? "#f0f0f0" : "transparent",
                borderRadius: "4px",
                marginBottom: "5px",
              }}
              onClick={() => handleHoursChange(hour)}
            >
              {hour} hours
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
