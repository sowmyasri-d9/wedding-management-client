// export default AddVenueForm;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Forms.css";
import http from "../http";

const AddVenueForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    image_url: "",
    pricePerHour: 0.00,
  });

  // Fetch existing venue details if editing
  useEffect(() => {
    if (id) {
      const fetchVenue = async () => {
        try {
          const response = await http.get(`/venues/${id}`);
          setFormData({
            name: response.data.data.name || "",
            location: response.data.data.location || "",
            category: response.data.data.category || "",
            image_url: response.data.data.image_url || "",
            pricePerHour: response.data.data.pricePerHour || 0.00
          });
        } catch (error) {
          console.error("Error fetching venue:", error);
          alert("Failed to load venue details.");
        }
      };
      fetchVenue();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await http.patch(`/venues/${id}`, formData);
        alert("Venue updated successfully!");
      } else {
        await http.post("/venues", formData);
        alert("Venue added successfully!");
      }
      navigate("/admin");
    } catch (err) {
      console.error("Error saving venue:", err);
      alert("Failed to save venue. Please try again.");
    }
  };

  return (
    <section className="form-container">
      <h2>{id ? "Edit Venue" : "Add Venue"}</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <input
          type="text"
          name="name"
          placeholder="Venue Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="Category (e.g., Indoor, Outdoor)"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          placeholder="Ptice Per Hour"
          name="pricePerHour"
          value={formData.pricePerHour}
          onChange={handleChange}
          required
        />

        <div className="action-form-btns">
          <input type="button" className="action-btn" value="Back" onClick={() => navigate("/admin")} />
          <button type="submit" className="action-btn">{id ? "Update Venue" : "Add Venue"}</button>
        </div>
      </form>
    </section>
  );
};

export default AddVenueForm;
