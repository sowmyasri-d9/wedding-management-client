import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ViewItemsAdmin from "../components/ViewItemsAdmin"; // Import the reusable component
import "../css/AdminPage.css";
import http from "../http";

const AdminPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null); // Track category selection
  const [items, setItems] = useState([]); // Store fetched data
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedCategory) return; // Don't fetch if no category selected

    const fetchData = async () => {
      try {
        let endpoint = ""; // API endpoint
        if (selectedCategory === "djs") {
          endpoint = "/djs";
        } else if (selectedCategory === "food-caterers") {
          endpoint = "/food-caterers";
        } else if (selectedCategory === "venue") {
          endpoint = "/venues";
        } else if (selectedCategory === "wedding-types") {
          endpoint = "/wedding-types";
        } else if (selectedCategory === "photography") {
          endpoint = "/photography";
        } else if (selectedCategory === "decorations") {
          endpoint = "/decorations";
        }

        const response = await http.get(endpoint);
        setItems(response.data.data || []);
      } catch (error) {
        console.error(`Error fetching ${selectedCategory}:`, error);
        setItems([]);
      }
    };

    fetchData();
  }, [selectedCategory]); // Re-fetch when category changes

  const handleUpdate = (id) => {
    if (!selectedCategory) return;

    let editPath = "";
    if (selectedCategory === "djs") {
      editPath = `/admin/add-dj/${id}`;
    } else if (selectedCategory === "food-caterers") {
      editPath = `/admin/add-food-caterer/${id}`;
    } else if (selectedCategory === "venue") {
      editPath = `/admin/add-venue/${id}`;
    } else if (selectedCategory === "wedding-types") {
      editPath = `/admin/add-wedding-type/${id}`;
    } else if (selectedCategory === "photography") {
      editPath = `/admin/add-photography/${id}`;
    } else if (selectedCategory === "decorations") {
      editPath = `/admin/add-decorator/${id}`;
    }

    navigate(editPath); // Navigate to the edit form with item ID
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await http.delete(`/${selectedCategory}/${id}`);
        setItems(items.filter((item) => item._id !== id));
      } catch (error) {
        alert("Error deleting item:", error);
      }
    }
  };

  const handleMakeAdmin = async () => {
    navigate("/admin/make-admin")
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <Sidebar setSelectedCategory={setSelectedCategory} /> {/* Pass function to Sidebar */}
        <main className="main-content">
          {/* Make Admin Button */}
          <button
            onClick={handleMakeAdmin}
            style={{
              padding: "10px 20px",
              backgroundColor: "#3498db",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            Make Admin
          </button>

          {selectedCategory && (
            <ViewItemsAdmin
              title={`List of ${selectedCategory}`}
              data={items}
              fields={selectedCategory === "wedding-types" ? ["type"] : ["name"]}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
