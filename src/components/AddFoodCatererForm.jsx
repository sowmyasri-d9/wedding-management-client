import React, { useState } from "react";
import axios from "axios";
import "./FormStyles.css"; // Shared styles for all forms

const AddFoodCatererForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    image_url: "",
    pricePerPerson: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/food-caterers", formData);
      alert("Food Caterer added successfully!");
      setFormData({
        name: "",
        location: "",
        category: "",
        image_url: "",
        pricePerPerson: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add Food Caterer");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Food Caterer</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Food Caterer Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <label>Location</label>
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />

        <label>Category</label>
        <input
          type="text"
          placeholder="Category (e.g., Indian, Continental)"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />

        <label>Image URL</label>
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          required
        />

        <label>Price Per Person</label>
        <input
          type="number"
          placeholder="Price Per Person"
          value={formData.pricePerPerson}
          onChange={(e) => setFormData({ ...formData, pricePerPerson: e.target.value })}
          required
        />

        <button type="submit">Add Food Caterer</button>
      </form>
    </div>
  );
};

export default AddFoodCatererForm;
