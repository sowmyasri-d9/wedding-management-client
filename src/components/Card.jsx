import React, { useState } from "react";

const Card = ({ item, fields, onSelect, selection }) => {
  const [selectedHours, setSelectedHours] = useState(4);
  const [selectedPeople, setSelectedPeople] = useState(100);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    // For food caterers, show people dropdown
    if (selection === "food-caterers") {
      setShowDropdown(!showDropdown);
    }
    // For services with hours (venue, DJ, photography), show hours dropdown
    else if (selection === "venues" || selection === "djs" || selection === "photography") {
      setShowDropdown(!showDropdown);
    }
    // For decorators, select directly (no dropdown needed)
    else {
      onSelect(item);
    }
  };

  const handleHoursChange = (hours) => {
    setSelectedHours(hours);
    const updatedItem = {
      ...item,
      hours: hours,
    };
    onSelect(updatedItem);
    setShowDropdown(false);
  };

  const handlePeopleChange = (people) => {
    setSelectedPeople(people);
    const updatedItem = {
      ...item,
      people: people,
    };
    onSelect(updatedItem);
    setShowDropdown(false);
  };

  // Determine what to display based on selection type
  const getDisplayFields = () => {
    const displayData = [];

    // Always show name
    displayData.push({ label: "Name", value: item.name });

    // Show category if it exists
    if (item.category) {
      displayData.push({ label: "Category", value: item.category });
    }

    // Show location if it exists
    if (item.location) {
      displayData.push({ label: "Location", value: item.location });
    }

    // Food Caterers - show Price Per Plate
    if (selection === "food-caterers" && item.price) {
      displayData.push({ label: "Price Per Plate", value: `$${item.price}` });
    }

    // Decorators - show Cost
    if (selection === "decorations" && item.price) {
      displayData.push({ label: "Cost", value: `$${item.price}` });
    }

    if (selection === "djs" && item.pricePerHour) {
      displayData.push({ label: "Price Per Hour", value: `$${item.pricePerHour}` });
    }

    if (selection === "venues" && item.pricePerHour) {
      displayData.push({ label: "Price Per Hour", value: `$${item.pricePerHour}` });
    }

    if (selection === "photography" && item.pricePerHour) {
      displayData.push({ label: "Price Per Hour", value: `$${item.pricePerHour}` });
    }

    // For venue, DJ, photography - don't show any price
    // They will select hours in dropdown but price is not displayed

    return displayData;
  };

  const displayFields = getDisplayFields();

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
        position: "relative",
        maxWidth: "400px",
      }}
      onClick={handleClick}
    >
      <img
        src={item.image_url}
        alt={item.name}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "8px",
          objectFit: "cover"
        }}
      />
      <div style={{ marginLeft: "10px", flex: 1 }}>
        {displayFields.map((field, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            <strong>{field.label}:</strong> {field.value}
          </div>
        ))}
      </div>

      {/* Dropdown for hours selection (venue, DJ, photography) */}
      {(selection === "venues" || selection === "djs" || selection === "photography") && showDropdown && (
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
          onClick={(e) => e.stopPropagation()}
        >
          <h4 style={{ margin: "0 0 10px 0" }}>Select Hours</h4>
          {[2, 4, 6, 8, 10].map((hour) => (
            <div
              key={hour}
              style={{
                padding: "5px",
                cursor: "pointer",
                backgroundColor: selectedHours === hour ? "#3498db" : "transparent",
                color: selectedHours === hour ? "#fff" : "#333",
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

      {/* Dropdown for people selection (food caterers) */}
      {selection === "food-caterers" && showDropdown && (
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
          onClick={(e) => e.stopPropagation()}
        >
          <h4 style={{ margin: "0 0 10px 0" }}>Select Number of People</h4>
          {[50, 100, 300, 500].map((people) => (
            <div
              key={people}
              style={{
                padding: "5px",
                cursor: "pointer",
                backgroundColor: selectedPeople === people ? "#3498db" : "transparent",
                color: selectedPeople === people ? "#fff" : "#333",
                borderRadius: "4px",
                marginBottom: "5px",
              }}
              onClick={() => handlePeopleChange(people)}
            >
              {people} people
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
