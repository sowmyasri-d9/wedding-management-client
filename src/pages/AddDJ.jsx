import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Forms.css";
import http from "../http";

const AddDJForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get DJ ID from the URL

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    description: "",
    pricePerHour: 0.0,
    image_url: "",
  });

  // Fetch existing DJ details if editing
  useEffect(() => {
    if (id) {
      const fetchDJ = async () => {
        try {
          const response = await http.get(`/djs/${id}`);
          setFormData({
            name: response.data.data.name || "",
            location: response.data.data.location || "",
            category: response.data.data.category || "",
            descriprion: response.data.descriprion || "",
            pricePerHour: response.data.pricePerHour || 0.00,
            image_url: response.data.data.image_url || "",
          });
        } catch (error) {
          console.error("Error fetching DJ:", error);
          alert("Failed to load DJ details.");
        }
      };
      fetchDJ();
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
        // Update existing DJ
        await http.patch(`/djs/${id}`, formData);
        alert("DJ updated successfully!");
      } else {
        // Add new DJ
        await http.post("/djs", formData);
        alert("DJ added successfully!");
      }
      navigate("/admin"); // Navigate back to admin page
    } catch (err) {
      console.error("Error saving DJ:", err.response ? err.response.data : err.message);
      alert("Failed to save DJ. Please try again.");
    }
  };

  return (
    <section className="form-container">
      <h2>{id ? "Edit DJ" : "Add DJ"}</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <input
          type="text"
          name="name"
          placeholder="DJ Name"
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
        
        <label htmlFor="pricePerHour">Price Per Hour</label>
        <input
          type="number"
          name="pricePerHour"
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
          <button type="submit" className="action-btn">{id ? "Update DJ" : "Add DJ"}</button>
        </div>
      </form>
    </section>
  );
};

export default AddDJForm;
