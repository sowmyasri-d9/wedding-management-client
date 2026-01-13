import React from "react";
import "../css/ViewItemsAdmin.css";

const ViewItemsAdmin = ({ title, data = [], fields = [], onUpdate, onDelete }) => {

  return (
    <div className="view-items-admin">
      <div className="view-items-admin-header">
        <h2>{title}</h2>
        <div className="item-count">
          Total: {data.length}
        </div>
      </div>
      
      <div className="items-list">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item) => (
            <div key={item._id} className="item">
              <div className="item-details">
                {fields.map((field) => (
                  <span>{item[field]}</span>
                ))}
              </div>
              <div className="item-actions">
                <button className="item-btn" onClick={() => onUpdate(item._id)}>Update</button>
                <button className="item-btn" onClick={() => onDelete(item._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewItemsAdmin;
