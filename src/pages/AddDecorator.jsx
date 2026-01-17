import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Forms.css";
import http from "../http";

const AddDecorator = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    description: "",
    price: 0.0, // Fixed price (no per hour)
    image_url: "",
  });

  // Fetch existing decorator details if editing
  useEffect(() => {
    if (id) {
      const fetchDecorator = async () => {
        try {
          const response = await http.get(`/decorations/${id}`);
          setFormData({
            name: response.data.data.name || "",
            location: response.data.data.location || "",
            category: response.data.data.category || "",
            description: response.data.data.description || "Our decorations are always stunning.",
            price: response.data.data.price || 0.0,
            image_url: response.data.data.image_url || "",
          });
        } catch (error) {
          console.error("Error fetching decorator:", error);
          alert("Failed to load decorator details.");
        }
      };
      fetchDecorator();
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
        await http.patch(`/decorations/${id}`, formData);
        alert("Decorator updated successfully!");
      } else {
        await http.post("/decorations", formData);
        alert("Decorator added successfully!");
      }
      navigate("/admin");
    } catch (err) {
      console.error("Error saving decorator:", err.response ? err.response.data : err.message);
      alert("Failed to save decorator. Please try again.");
    }
  };

  return (
    <section className="form-container">
      <h2>{id ? "Edit Decorator" : "Add Decorator"}</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <input
          type="text"
          name="name"
          placeholder="Decorator Name"
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
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
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
          <input type="button" value="Back" onClick={() => navigate("/admin")} className="action-btn" />
          <button type="submit" className="action-btn">{id ? "Update Decorator" : "Add Decorator"}</button>
        </div>
      </form>
    </section>
  );
};

export default AddDecorator;
