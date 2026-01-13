import React, { useState, useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom"; // Import hooks
import "../css/Forms.css";
import http from "../http";


const AddWedding = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from URL
  

  const [formData, setFormData] = useState({
    type: "",
    img_url: ""
  });

  // Fetch existing wedding type details if editing
  useEffect(() => {
    if (id) {
      const fetchWeddingType = async () => {
        try {
          const response = await http.get(`/wedding-types/${id}`);
          console.log(response);
          
          setFormData({
            type: response.data.type || "",
            img_url: response.data.img_url || ""
          });
        } catch (error) {
          console.error("Error fetching wedding type:", error);
          alert("Failed to load wedding type details.");
        }
      };
      fetchWeddingType();
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
        // Update existing wedding type
        await http.patch(`/wedding-types/${id}`, formData);
        alert("Wedding Type updated successfully!");
      } else {
        // Add new wedding type
        await http.post("/wedding-types", formData);
        alert("Wedding Type added successfully!");
      }
      navigate("/admin"); // Navigate back to admin page
    } catch (err) {
      alert("Failed to save wedding type");
    }
  };

  return (
    <section className="form-container">
      <h2>{id ? "Edit Wedding Type" : "Add Wedding Type"}</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <input
          type="text"
          name="type"
          placeholder="Wedding Type"
          value={formData.type}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="Image Url"
          name="img_url"
          value={formData.img_url}
          onChange={handleChange}
          required
        />

        <div className="action-form-btns">
          <input type="button" className="action-btn" value="Back" onClick={() => navigate("/admin")} />
          <button type="submit" className="action-btn">{id ? "Update Wedding" : "Add Wedding"}</button>
        </div>
      </form>
    </section>
  );
};

export default AddWedding;
