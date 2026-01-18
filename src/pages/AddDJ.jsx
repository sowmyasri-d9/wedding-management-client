import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Forms.css";
import http from "../http";

const AddDJForm = () => {
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
            description: response.data.data.description || "",
            image_url: response.data.data.image_url || "",
            pricePerHour: response.data.data.pricePerHour || 0.00
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
        await http.patch(`/djs/${id}`, formData);
        alert("DJ updated successfully!");
      } else {
        await http.post("/djs", formData);
        alert("DJ added successfully!");
      }
      navigate("/admin");
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
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleFormChange}
          required
        />
        <input
          type="number"
          name="pricePerHour"
          placeholder="Price Per Hour"
          value={formData.pricePerHour}
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
