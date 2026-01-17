// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom"; 
// import "../css/Forms.css";
// import http from "../http";

// const AddCaterer = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); 

//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     category: "",
//     image_url: "",
//     price: 0.00,
//   });

//   // Fetch existing caterer details if editing
//   useEffect(() => {
//     if (id) {
//       const fetchCaterer = async () => {
//         try {
//           const response = await http.get(`/food-caterers/${id}`);

//           setFormData({
//             name: response.data.data.name || "",
//             location: response.data.data.location || "",
//             category: response.data.data.category || "",
//             image_url: response.data.data.image_url || "",
//             price: response.data.data.pricePerHour || 0.00,
//           });
//         } catch (error) {
//           console.error("Error fetching caterer:", error);
//           alert("Failed to load caterer details.");
//         }
//       };
//       fetchCaterer();
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (id) {
//         await http.patch(`/food-caterers/${id}`, formData);
//         alert("Caterer updated successfully!");
//       } else {
//         await http.post("/food-caterers", formData);
//         alert("Caterer added successfully!");
//       }
//       navigate("/admin"); 
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save Caterer");
//     }
//   };

//   return (
//     <section className="form-container">
//       <h2>{id ? "Edit Caterer" : "Add Caterer"}</h2>
//       <form onSubmit={handleSubmit} className="form-content">
//         <input
//           type="text"
//           name="name"
//           placeholder="Caterer Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Location"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Category (e.g., Indian, Spanish)"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Image URL"
//           name="image_url"
//           value={formData.image_url}
//           onChange={handleChange}
//           required
//         />

//         <label>Price Per Hour</label>
//         <input
//           type="number"
//           placeholder="Price Per Person"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />

//         <div className="action-form-btns">
//           <input type="button" value="Back" onClick={() => navigate("/admin")} className="action-btn" />
//           <button type="submit" className="action-btn">{id ? "Update Caterer" : "Add Caterer"}</button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default AddCaterer;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Forms.css";
import http from "../http";

const AddCaterer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    image_url: "",
    price: 0.00, // Price per plate
  });

  // Fetch existing caterer details if editing
  useEffect(() => {
    if (id) {
      const fetchCaterer = async () => {
        try {
          const response = await http.get(`/food-caterers/${id}`);

          setFormData({
            name: response.data.data.name || "",
            location: response.data.data.location || "",
            category: response.data.data.category || "",
            image_url: response.data.data.image_url || "",
            price: response.data.data.price || 0.00,
          });
        } catch (error) {
          console.error("Error fetching caterer:", error);
          alert("Failed to load caterer details.");
        }
      };
      fetchCaterer();
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
        await http.patch(`/food-caterers/${id}`, formData);
        alert("Caterer updated successfully!");
      } else {
        await http.post("/food-caterers", formData);
        alert("Caterer added successfully!");
      }
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("Failed to save Caterer");
    }
  };

  return (
    <section className="form-container">
      <h2>{id ? "Edit Caterer" : "Add Caterer"}</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <input
          type="text"
          name="name"
          placeholder="Caterer Name"
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
          placeholder="Category (e.g., Indian, Spanish)"
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

        <label>Price Per Plate</label>
        <input
          type="number"
          placeholder="Price Per Plate"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <div className="action-form-btns">
          <input type="button" value="Back" onClick={() => navigate("/admin")} className="action-btn" />
          <button type="submit" className="action-btn">{id ? "Update Caterer" : "Add Caterer"}</button>
        </div>
      </form>
    </section>
  );
};

export default AddCaterer;
