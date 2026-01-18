import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Forms.css";
import http from "../http";

const AddPhotography = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    description: "",
    image_url: "",
    pricePerHour: 0.00
  });

  // Fetch existing photography details if editing
  useEffect(() => {
    if (id) {
      const fetchPhotography = async () => {
        try {
          const response = await http.get(`/photography/${id}`);
          setFormData({
            name: response.data.data.name || "",
            location: response.data.data.location || "",
            category: response.data.data.category || "",
            description: response.data.data.description || "",
            image_url: response.data.data.image_url || "",
            pricePerHour: response.data.data.pricePerHour || 0.00
          });
        } catch (error) {
          console.error("Error fetching photography:", error);
          alert("Failed to load photography details.");
        }
      };
      fetchPhotography();
    }
  }, [id]);

  const handleFormChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await http.patch(`/photography/${id}`, formData);
        alert("Photography updated successfully!");
      } else {
        await http.post("/photography", formData);
        alert("Photography added successfully!");
      }
      navigate("/admin");
    } catch (err) {
      console.error("Error saving photography:", err.response ? err.response.data : err.message);
      alert("Failed to save photography. Please try again.");
    }
  };

  return (
    <section className="form-container">
      <h2>{id ? "Edit Photography" : "Add Photography"}</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <input
          type="text"
          name="name"
          placeholder="Photography Name"
          value={formData.name}
          onChange={handleFormChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleFormChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g., Indian, American)"
          value={formData.category}
          onChange={handleFormChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description..."
          value={formData.description}
          onChange={handleFormChange}
          required
        />
        <input
          type="number"
          name="pricePerHour"
          placeholder="Description..."
          value={formData.pricePerHour}
          onChange={handleFormChange}
          required
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleFormChange}
          required
        />
        <div className="action-form-btns">
          <input type="button" value="Back" onClick={() => navigate("/admin")} className="action-btn"/>
          <button type="submit" className="action-btn">{id ? "Update Photography" : "Add Photography"}</button>
        </div>
      </form>
    </section>
  );
};

export default AddPhotography;
