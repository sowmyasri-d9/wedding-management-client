import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import http from "../http";
import Dialog from "../components/Dialog";
import Card from "../components/Card";

const Dashboard = () => {
  const location = useLocation();
  const [user, setUser] = useState({});
  const [selection, setSelection] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState("cultures");
  const [selectedWedding, setSelectedWedding] = useState(null);
  const [data, setData] = useState([]); // Data for the selected item
  const [selectedDetails, setSelectedDetails] = useState({
    email: "",
    wedding: "",
    eventDate: "",
    food: null,
    venue: null,
    dj: null,
    photography: null,
    decorators: null,
  });
  const [showPreviewDialog, setShowPreviewDialog] = useState(false); // Control preview dialog visibility
  const [eventDate, setEventDate] = useState(""); // Event date state
  const [showConfirmation, setShowConfirmation] = useState(false); // Confirmation message visibility
  const [weddingId, setWeddingId] = useState(null);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // Set the selected wedding from location state
  useEffect(() => {
    if (location.state?.selectedWedding) {
      setSelectedWedding(location.state.selectedWedding.type);
      setSelectedDetails((prev) => ({
        ...prev,
        wedding: location.state.selectedWedding.type,
      }));
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state?.selectedWedding) {
      setWeddingId(location.state.selectedWedding._id);
    }
  }, [location.state]);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await http.get(`/users/${userId}`);
        setUser(response.data.data);
        setSelectedDetails((prev) => ({
          ...prev,
          email: response.data.data.email,
        }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUser();
  }, [userId]);

  // Fetch data for the selected item
  useEffect(() => {
    const fetchData = async () => {
      // Exclude "cultures" and "event-date" from fetching data
      if (selection && selection !== "cultures" && selection !== "event-date") {
        try {
          const response = await http.get(`/${selection}`);
          setData(response.data.data);
        } catch (error) {
          console.error(`Error fetching ${selection} data:`, error);
          setData([]);
        }
      }
    };
    fetchData();
  }, [selection]);

  // Check if all details are selected
  const isAllDetailsSelected = () => {
    return (
      selectedDetails.wedding &&
      selectedDetails.eventDate &&
      selectedDetails.food &&
      selectedDetails.venue &&
      selectedDetails.dj &&
      selectedDetails.photography &&
      selectedDetails.decorators
    );
  };

  const handleClick = (item) => {
    if (item === "cultures") {
      navigate("/culture");
      return;
    }
    setSelection(item);
    setActiveItem(item);
  };

  const setCorrectField = (selection) => {
    if (selection === "food-caterers") {
      return "food";
    } else if (selection === "venues") {
      return "venue";
    } else if (selection === "djs") {
      return "dj";
    } else if (selection === "photography") {
      return "photography";
    } else if (selection === "decorations") {
      return "decorators";
    }
  };

  const handleSelectItem = (item) => {
    const updatedItem = {
      name: item.name,
      cost: item.pricePerHour
        ? item.pricePerHour * (item.hours || 1)
        : item.price,
      hours: item.pricePerHour ? item.hours || 1 : 0, // Only include hours for items with pricePerHour
      image: item.image_url, // Add image to the selected item
    };

    // For food and decorators, remove hours field since they don't charge per hour
    if (selection === "food-caterers" || selection === "decorations") {
      delete updatedItem.hours;
      
      // For food caterers, also add people count
      if (selection === "food-caterers") {
        updatedItem.people = item.people || 100; // Default to 100 people if not specified
        // Recalculate cost for food based on number of people
        updatedItem.cost = item.price * updatedItem.people;
      }
    }

    // Update selectedDetails based on the selection type
    setSelectedDetails((prev) => ({
      ...prev,
      [setCorrectField(selection)]: updatedItem,
    }));

    // Show confirmation if all details are selected
    if (isAllDetailsSelected()) {
      setShowConfirmation(true);
    }
  };

  const handleDateChange = (e) => {
    setEventDate(e.target.value);
    setSelectedDetails((prev) => ({
      ...prev,
      eventDate: e.target.value,
    }));

    // Show confirmation if all details are selected
    if (isAllDetailsSelected()) {
      setShowConfirmation(true);
    }
  };

  const handleBookNow = async () => {
    try {
      const bookingData = {
        ...selectedDetails,
        // Ensure all items have required fields
        food: selectedDetails.food ? {
          name: selectedDetails.food.name,
          cost: selectedDetails.food.cost,
          image: selectedDetails.food.image,
          people: selectedDetails.food.people || 100
        } : null,
        venue: selectedDetails.venue ? {
          name: selectedDetails.venue.name,
          cost: selectedDetails.venue.cost,
          image: selectedDetails.venue.image,
          hours: selectedDetails.venue.hours || 4
        } : null,
        dj: selectedDetails.dj ? {
          name: selectedDetails.dj.name,
          cost: selectedDetails.dj.cost,
          image: selectedDetails.dj.image,
          hours: selectedDetails.dj.hours || 4
        } : null,
        photography: selectedDetails.photography ? {
          name: selectedDetails.photography.name,
          cost: selectedDetails.photography.cost,
          image: selectedDetails.photography.image,
          hours: selectedDetails.photography.hours || 4
        } : null,
        decorators: selectedDetails.decorators ? {
          name: selectedDetails.decorators.name,
          cost: selectedDetails.decorators.cost,
          image: selectedDetails.decorators.image
        } : null
      };

      const response = await http.post("/booking", bookingData);
      if (response.status === 201) {
        alert("Booking created successfully!");
        navigate(`/budget/${encodeURIComponent(selectedDetails.email)}`, {
          state: { selectedDetails: bookingData },
        });
      } else {
        alert("Failed to create booking. Please try again.");
      }
    } catch (error) {
      console.error("Error creating booking:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  const handleSuggested = () => {
    if (weddingId===null) {
      alert(`You have to select wedding in Cultures`);
      return;
    }
    navigate(`/wedding-details/${weddingId}`);
  };

  const isAdmin = () => {
    return user.admin;
  };

  const redirectToAdmin = () => {
    navigate("/admin");
  };

  const defaultFields = ["name", "category", "pricePerHour", "price"]; // Exclude _id and image_url

  return (
    <div
      style={{ display: "flex", height: "100vh", backgroundColor: "#f4f4f4" }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#2c3e50",
          color: "#ffffff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={
              user.image ||
              "https://img.icons8.com/?size=100&id=23235&format=png&color=000000"
            }
            alt="Profile"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
          <p>{user.email}</p>
        </div>
        <div
          style={{
            backgroundColor: "#34495e",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginTop: "0.5rem",
            borderRadius: "1rem",
            gap: "0.5rem",
            justifyContent: "space-around",
            padding: "1rem",
            boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.3)",
          }}
        >
          {[
            "cultures",
            "event-date",
            "food-caterers",
            "venues",
            "djs",
            "photography",
            "decorations",
          ].map((item) => (
            <Link
              key={item}
              to="#"
              style={{
                flex: 1,
                textAlign: "center",
                backgroundColor:
                  hoveredItem === item
                    ? "#2980b9"
                    : activeItem === item
                    ? "#1c5980"
                    : "#3498db",
                color: "#fff",
                padding: "0.5rem",
                boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.3)",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                textDecoration: "none",
                transform:
                  hoveredItem === item
                    ? "scale(1.05)"
                    : activeItem === item
                    ? "scale(0.95)"
                    : "none",
              }}
              onClick={() => handleClick(item)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.replace("-", " ").toUpperCase()}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          padding: "8px",
          overflowY: "auto",
        }}
      >
        <h2
          style={{
            display: "flex",
            width: "100%",
            padding: "10px",
            backgroundColor: "#3498db",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            textTransform: "capitalize",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {selection ? selection.replace("-", " ") : "event-date"}
        </h2>

        {/* Event Date Picker */}
        {selection === "event-date" && (
          <div style={{ margin: "10px" }}>
            <input
              type="date"
              value={eventDate}
              onChange={handleDateChange}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        )}

        {/* Buttons Row */}
        <div style={{ display: "flex", gap: "10px", margin: "10px" }}>
          <button
            onClick={() => setShowPreviewDialog(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#3498db",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            View Preview
          </button>

          <button
            onClick={handleSuggested}
            style={{
              padding: "10px 20px",
              backgroundColor: "#3498db",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Suggested
          </button>

          {/* Book Now Button */}
          {isAllDetailsSelected() && (
            <button
              onClick={handleBookNow}
              style={{
                padding: "10px 20px",
                backgroundColor: "#3498db",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Book Now
            </button>
          )}

          {/* ADMIN BUTTON */}
          {isAdmin() && (
            <button
              onClick={redirectToAdmin}
              style={{
                padding: "10px 20px",
                backgroundColor: "#3498db",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Admin Pannel
            </button>
          )}
        </div>

        {/* Data Cards */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data.map((item) => (
            <Card
              key={item._id}
              item={item}
              fields={defaultFields}
              onSelect={() => handleSelectItem(item)}
              selection={selection}
            />
          ))}
        </div>
      </div>

      {/* Preview Dialog */}
      {showPreviewDialog && (
        <Dialog onClose={() => setShowPreviewDialog(false)}>
          <h2>Selected Details</h2>

          {selectedWedding && (
            <div style={{ marginBottom: "10px" }}>
              <strong>Wedding Type:</strong> {selectedWedding}
            </div>
          )}

          {eventDate && (
            <div style={{ marginBottom: "10px" }}>
              <strong>Event Date:</strong> {eventDate}
            </div>
          )}

          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              background: "#3498db",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            {Object.entries(selectedDetails).map(([key, value]) => {
              if (value && typeof value === "object") {
                return (
                  <div
                    key={key}
                    style={{
                      padding: "10px",
                      margin: "10px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h3>{key.toUpperCase()}</h3>
                    {value.image && (
                      <img 
                        src={value.image} 
                        alt={value.name}
                        style={{
                          width: "100%",
                          maxHeight: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginBottom: "10px"
                        }}
                      />
                    )}
                    <p>Name: {value.name}</p>
                    <p>Cost: ${value.cost}</p>
                    {value.hours && <p>Hours: {value.hours}</p>}
                    {value.people && <p>People: {value.people}</p>}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </Dialog>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <Dialog onClose={() => setShowConfirmation(false)}>
          <h2>All Details Selected!</h2>
          <p>You have successfully selected all the required details.</p>
          <button
            onClick={() => setShowConfirmation(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#3498db",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </Dialog>
      )}
    </div>
  );
};

export default Dashboard;
