import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../http";

const WeddingDetails = () => {
  const [selectedDetails, setSelectedDetails] = useState({
    email: "",
    eventDate: "",
    food: null,
    venue: null,
    dj: null,
    photography: null,
    decorators: null,
  });
  const [foodCaterers, setFoodCaterers] = useState([]);
  const [venues, setVenues] = useState([]);
  const [djs, setDjs] = useState([]);
  const [photographers, setPhotographers] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [weddingType, setWeddingType] = useState("");
  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  // Fetch user email
  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const response = await http.get(`/users/${userId}`);
        setSelectedDetails((prev) => ({
          ...prev,
          email: response.data.data.email,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    getUserEmail();
  }, [userId]);

  // Fetch wedding type
  useEffect(() => {
    const getWeddingType = async () => {
      try {
        const response = await http.get(`/wedding-types/${id}`);
        if (response.status === 200) {
          const wType =
            response.data.type.split(" ")[0].charAt(0).toUpperCase() +
            response.data.type.split(" ")[0].slice(1).toLowerCase();
          setWeddingType(wType);
        }
      } catch (error) {
        console.error("Error fetching wedding type:", error.message);
      }
    };
    getWeddingType();
  }, [id]);

  // Fetch food caterers
  useEffect(() => {
    const getFoodCaterers = async () => {
      try {
        const response = await http.get(`/food-caterers`);
        if (response.status === 200) {
          const filteredFoodCaterers = response.data.data.filter(
            (item) => item.category === weddingType
          );
          setFoodCaterers(filteredFoodCaterers);
        }
      } catch (error) {
        console.error("Error fetching food caterers:", error.message);
      }
    };
    if (weddingType) getFoodCaterers();
  }, [weddingType]);

  // Fetch venues
  useEffect(() => {
    const getVenues = async () => {
      try {
        const response = await http.get(`/venues`);
        if (response.status === 200) {
          const filteredVenues = response.data.data.filter(
            (item) => item.category === weddingType
          );
          setVenues(filteredVenues);
        }
      } catch (error) {
        console.error("Error fetching venues:", error.message);
      }
    };
    if (weddingType) getVenues();
  }, [weddingType]);

  // Fetch DJs
  useEffect(() => {
    const getDjs = async () => {
      try {
        const response = await http.get(`/djs`);
        if (response.status === 200) {
          const filteredDjs = response.data.data.filter(
            (item) => item.category === weddingType
          );
          setDjs(filteredDjs);
        }
      } catch (error) {
        console.error("Error fetching DJs:", error.message);
      }
    };
    if (weddingType) getDjs();
  }, [weddingType]);

  // Fetch photographers
  useEffect(() => {
    const getPhotographers = async () => {
      try {
        const response = await http.get(`/photography`);
        if (response.status === 200) {
          setPhotographers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching photographers:", error.message);
      }
    };
    getPhotographers();
  }, []);

  // Fetch decorators
  useEffect(() => {
    const getDecorators = async () => {
      try {
        const response = await http.get(`/decorations`);
        if (response.status === 200) {
          setDecorators(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching decorators:", error.message);
      }
    };
    getDecorators();
  }, []);

  const [showFoodOptions, setShowFoodOptions] = useState(false);
  const [showVenuesOptions, setShowVenuesOptions] = useState(false);
  const [showDjOptions, setShowDjOptions] = useState(false);
  const [showPhotographerOptions, setShowPhotographerOptions] = useState(false);
  const [showDecoratorOptions, setShowDecoratorOptions] = useState(false);

  const updateDetails = () => {
    const selectedFoodOption = document.getElementById("food-hotels-dropdown").value;
    const selectedPeople = document.getElementById("num-people-food").value;
    const selectedVenueOption = document.getElementById("venues-dropdown").value;
    const selectedVenueHours = document.getElementById("num-hours-venue").value;
    const selectedDjOption = document.getElementById("dj-services-dropdown").value;
    const selectedDjHours = document.getElementById("num-hours-dj").value;
    const selectedPhotographerOption = document.getElementById("photographers-dropdown").value;
    const selectedPhotographerHours = document.getElementById("num-hours-photographer").value;
    const selectedDecoratorOption = document.getElementById("decorators-dropdown").value;
    const selectedEventDate = document.getElementById("event-date").value;

    const updatedDetails = {};

    // Update event date
    if (selectedEventDate) {
      updatedDetails.eventDate = selectedEventDate;
    }

    // Food details - price per plate
    if (selectedFoodOption) {
      const [name, image, pricePerPlate] = selectedFoodOption.split("|");
      const foodCost = parseInt(selectedPeople) * parseFloat(pricePerPlate);
      updatedDetails.food = {
        name,
        people: parseInt(selectedPeople),
        pricePerPlate: parseFloat(pricePerPlate),
        cost: foodCost,
        image,
      };
    }

    // Venue details - no pricing stored
    if (selectedVenueOption) {
      const [name, image] = selectedVenueOption.split("|");
      updatedDetails.venue = {
        name,
        hours: parseInt(selectedVenueHours),
        image,
      };
    }

    // DJ details - no pricing stored
    if (selectedDjOption) {
      const [name, image] = selectedDjOption.split("|");
      updatedDetails.dj = {
        name,
        hours: parseInt(selectedDjHours),
        image,
      };
    }

    // Photographer details - no pricing stored
    if (selectedPhotographerOption) {
      const [name, image ] = selectedPhotographerOption.split("|");
      updatedDetails.photography = {
        name,
        hours: parseInt(selectedPhotographerHours),
        image,
      };
    }

    // Decorator details - fixed price
    if (selectedDecoratorOption) {
      const [name, image, price] = selectedDecoratorOption.split("|");
      const decoratorCost = parseFloat(price);
      updatedDetails.decorators = {
        name,
        cost: decoratorCost,
        image,
      };
    }

    // Update selectedDetails in one go
    setSelectedDetails((prev) => ({
      ...prev,
      ...updatedDetails,
      wedding: weddingType,
    }));
  };

  const handleBookNow = async () => {
    const bookingData = {
      email: selectedDetails.email,
      eventDate: selectedDetails.eventDate,
      wedding: weddingType,
      ...selectedDetails,
    };

    try {
      const response = await http.post("/booking", bookingData);
      if (response.status === 201) {
        alert("Booking created successfully!");
        navigate(`/budget/${encodeURIComponent(selectedDetails.email)}`, { state: { selectedDetails } });
      } else {
        alert("Failed to create booking. Please try again.");
      }
    } catch (error) {
      console.error("Error creating booking:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  // Inline styles
  const styles = {
    container: {
      width: "95%",
      height: "90%",
      display: "flex",
      flexDirection: "row",
      borderRadius: "15px",
      overflow: "hidden",
      margin: "0 1rem",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    formContainer: {
      width: "30%",
      justifyContent: "start",
      alignItems: "start",
      backgroundColor: "#2c3e50",
      color: "white",
      display: "flex",
    },
    detailsContainer: {
      width: "70%",
      justifyContent: "start",
      alignItems: "start",
      backgroundColor: "rgba(52, 152, 219, 0.9)",
      color: "white",
      display: "flex",
    },
    formSection: {
      width: "100%",
      padding: "1.5rem",
      backgroundColor: "#2c3e50",
      color: "white",
      display: "flex",
      overflowY: "scroll",
      flexDirection: "column",
      gap: "0.5rem",
      justifyContent: "flex-start",
      transition: "width 0.3s ease",
    },
    detailsSection: {
      width: "70%",
      minHeight: "100vh",
      padding: "0.5rem",
      backgroundColor: "rgba(52, 152, 219, 0.9)",
      color: "white",
      overflowY: "auto",
      borderLeft: "2px solid #ffffff",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    customBtn: {
      backgroundColor: "#f9a826",
      padding: "0.5rem",
      borderRadius: "10px",
      fontSize: "1.1rem",
      textAlign: "center",
      cursor: "pointer",
      transition: "transform 0.3s ease",
      marginBottom: "0.5rem",
    },
    customBtnHover: {
      backgroundColor: "#f931b3",
    },
    label: {
      fontSize: "1.1rem",
      marginBottom: "1rem",
      color: "white",
    },
    select: {
      fontSize: "1.1rem",
      marginBottom: "1rem",
      padding: "0.75rem",
      borderRadius: "10px",
      backgroundColor: "#f0f0f0",
      border: "1px solid #ddd",
      color: "#333",
    },
    selectFocus: {
      outline: "none",
      borderColor: "#f9a826",
    },
    hidden: {
      display: "none",
    },
    spaceAboveBookNow: {
      marginTop: "2rem",
    },
    img: {
      width: "100%",
      height: "auto",
      objectFit: "contain",
      borderRadius: "10px",
    },
    h3: {
      marginTop: "1rem",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    p: {
      fontSize: "1.1rem",
      marginTop: "0.5rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.formSection}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#ffffff" }}>
            {weddingType} Wedding
          </h2>

          {/* Event Date Picker */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="event-date" style={styles.label}>
              Event Date
            </label>
            <input
              type="date"
              id="event-date"
              style={styles.select}
              onChange={updateDetails}
            />
          </div>

          <button
            style={styles.customBtn}
            onClick={() => setShowFoodOptions(!showFoodOptions)}
          >
            Choose Food Catering
          </button>
          <button
            style={styles.customBtn}
            onClick={() => setShowVenuesOptions(!showVenuesOptions)}
          >
            Choose Venues
          </button>
          <button
            style={styles.customBtn}
            onClick={() => setShowDjOptions(!showDjOptions)}
          >
            Choose Music Services
          </button>
          <button
            style={styles.customBtn}
            onClick={() => setShowPhotographerOptions(!showPhotographerOptions)}
          >
            Choose Photographer
          </button>
          <button
            style={styles.customBtn}
            onClick={() => setShowDecoratorOptions(!showDecoratorOptions)}
          >
            Choose Decorator
          </button>

          {/* Food Options */}
          <div style={{ display: showFoodOptions ? "block" : "none" }}>
            <label htmlFor="food-hotels-dropdown" style={styles.label}>
              Food Catering
            </label>
            <select id="food-hotels-dropdown" style={styles.select} onChange={updateDetails}>
              <option value="" disabled selected>
                Select a food caterer...
              </option>
              {foodCaterers.map((caterer) => (
                <option
                  key={caterer._id}
                  value={`${caterer.name}|${caterer.image_url}|${caterer.price}`}
                >
                  {caterer.name}
                </option>
              ))}
            </select>

            <label htmlFor="num-people-food" style={styles.label}>
              Number of People
            </label>
            <select id="num-people-food" style={styles.select} onChange={updateDetails}>
              <option value="" disabled selected>
                Select no.of people...
              </option>
              <option value="50">50 People</option>
              <option value="100">100 People</option>
              <option value="300">300 People</option>
              <option value="500">500 People</option>
            </select>
          </div>

          {/* Venue Options */}
          <div style={{ display: showVenuesOptions ? "block" : "none" }}>
            <label htmlFor="venues-dropdown" style={styles.label}>
              Venues
            </label>
            <select id="venues-dropdown" style={styles.select} onChange={updateDetails}>
              <option value="" disabled selected>
                Select a venue...
              </option>
              {venues.map((venue) => (
                <option
                  key={venue._id}
                  value={`${venue.name}|${venue.image_url}`}
                >
                  {venue.name}
                </option>
              ))}
            </select>

            <label htmlFor="num-hours-venue" style={styles.label}>
              Number of Hours (Venue)
            </label>
            <select id="num-hours-venue" style={styles.select} onChange={updateDetails}>
              <option value="" disabled selected>
                Select no.of hrs...
              </option>
              <option value="4">4 Hours</option>
              <option value="6">6 Hours</option>
              <option value="8">8 Hours</option>
              <option value="10">10 Hours</option>
            </select>
          </div>

          {/* DJ Options */}
          <div style={{ display: showDjOptions ? "block" : "none" }}>
            <label htmlFor="dj-services-dropdown" style={styles.label}>
              Music Services
            </label>
            <select id="dj-services-dropdown" style={styles.select} onChange={updateDetails}>
              <option value="" disabled selected>
                Select a music service...
              </option>
              {djs.map((dj) => (
                <option
                  key={dj._id}
                  value={`${dj.name}|${dj.image_url}`}
                >
                  {dj.name} - {dj.location}
                </option>
              ))}
            </select>

            <label htmlFor="num-hours-dj" style={styles.label}>
              Number of Hours (Music)
            </label>
            <select id="num-hours-dj" style={styles.select} onChange={updateDetails}>
              <option value="" disabled selected>
                Select no.of hrs...
              </option>
              <option value="2">2 Hours</option>
              <option value="4">4 Hours</option>
              <option value="6">6 Hours</option>
              <option value="8">8 Hours</option>
            </select>
          </div>

          {/* Photographer Options */}
          <div style={{ display: showPhotographerOptions ? "block" : "none" }}>
            <label htmlFor="photographers-dropdown" style={styles.label}>
              Photographers
            </label>
            <select id="photographers-dropdown" style={styles.select} onChange={updateDetails}>
              <option value="" disabled selected>
                Select a photographer...
              </option>
              {photographers.map((photographer) => (
                <option
                  key={photographer._id}
                  value={`${photographer.name}|${photographer.image_url}`}
                >
                  {photographer.name}
                </option>
              ))}
            </select>

            <label htmlFor="num-hours-photographer" style={styles.label}>
              Number of Hours (Photography)
            </label>
            <select id="num-hours-photographer" style={styles.select} onChange={updateDetails}>
              <option value="" disabled selected>
                Select no.of hrs...
              </option>
              <option value="2">2 Hours</option>
              <option value="4">4 Hours</option>
              <option value="6">6 Hours</option>
              <option value="8">8 Hours</option>
            </select>
          </div>

          {/* Decorator Options */}
          <div style={{ display: showDecoratorOptions ? "block" : "none" }}>
            <label htmlFor="decorators-dropdown" style={styles.label}>
              Decorators
            </label>
            <select id="decorators-dropdown" style={styles.select} onChange={updateDetails}>
              <option value="" disabled selected>
                Select a decorator...
              </option>
              {decorators.map((decorator) => (
                <option
                  key={decorator._id}
                  value={`${decorator.name}|${decorator.image_url}|${decorator.price}`}
                >
                  {decorator.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.spaceAboveBookNow}>
            <button style={styles.customBtn} onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      <div style={styles.detailsContainer}>
        <div style={styles.detailsSection}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#ffffff" }}>
            Selected Details
          </h2>
          <div>
            {selectedDetails.eventDate && (
              <div style={{ marginBottom: "2rem" }}>
                <h3>Event Date: {selectedDetails.eventDate}</h3>
              </div>
            )}
            {selectedDetails.food && (
              <div style={{ marginBottom: "2rem" }}>
                <img src={selectedDetails.food.image} alt={selectedDetails.food.name} style={styles.img} />
                <h3 style={styles.h3}>Food Catering: {selectedDetails.food.name}</h3>
                <p style={styles.p}>Number of People: {selectedDetails.food.people}</p>
                <p style={styles.p}>Price Per Plate: ${selectedDetails.food.pricePerPlate}</p>
                <p style={styles.p}>Total Cost: ${selectedDetails.food.cost}</p>
              </div>
            )}
            {selectedDetails.venue && (
              <div style={{ marginBottom: "2rem" }}>
                <img src={selectedDetails.venue.image} alt={selectedDetails.venue.name} style={styles.img} />
                <h3 style={styles.h3}>Venue: {selectedDetails.venue.name}</h3>
                <p style={styles.p}>Number of Hours: {selectedDetails.venue.hours}</p>
              </div>
            )}
            {selectedDetails.dj && (
              <div style={{ marginBottom: "2rem" }}>
                <img src={selectedDetails.dj.image} alt={selectedDetails.dj.name} style={styles.img} />
                <h3 style={styles.h3}>DJ: {selectedDetails.dj.name}</h3>
                <p style={styles.p}>Number of Hours: {selectedDetails.dj.hours}</p>
              </div>
            )}
            {selectedDetails.photography && (
              <div style={{ marginBottom: "2rem" }}>
                <img
                  src={selectedDetails.photography.image}
                  alt={selectedDetails.photography.name}
                  style={styles.img}
                />
                <h3 style={styles.h3}>Photographer: {selectedDetails.photography.name}</h3>
                <p style={styles.p}>Number of Hours: {selectedDetails.photography.hours}</p>
              </div>
            )}
            {selectedDetails.decorators && (
              <div style={{ marginBottom: "2rem" }}>
                <img
                  src={selectedDetails.decorators.image}
                  alt={selectedDetails.decorators.name}
                  style={styles.img}
                />
                <h3 style={styles.h3}>Decorator: {selectedDetails.decorators.name}</h3>
                <p style={styles.p}>Cost: ${selectedDetails.decorators.cost}</p>
              </div>
            )}
            {!selectedDetails.food &&
              !selectedDetails.venue &&
              !selectedDetails.dj &&
              !selectedDetails.photography &&
              !selectedDetails.decorators && (
                <p>Select services to see your details here...</p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingDetails;
