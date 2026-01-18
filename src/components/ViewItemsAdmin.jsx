import React from "react";
import "../css/ViewItemsAdmin.css";

const ViewItemsAdmin = ({ title, data = [], fields = [], onUpdate, onDelete }) => {
  // Filter fields to show only relevant ones based on the data type
  const getDisplayFields = (item) => {
    const displayFields = [];
    
    fields.forEach(field => {
      // Skip pricePerHour for food caterers and decorators
      if (field === 'pricePerHour' && (!item.pricePerHour || item.pricePerHour === undefined)) {
        return;
      }
      // Skip price for venues, DJs, and photography
      if (field === 'price' && item.pricePerHour !== undefined) {
        return;
      }
      
      displayFields.push(field);
    });
    
    return displayFields;
  };

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
          data.map((item) => {
            const displayFields = getDisplayFields(item);
            return (
              <div key={item._id} className="item">
                <div className="item-details">
                  {displayFields.map((field) => (
                    <span key={field}>{item[field]}</span>
                  ))}
                </div>
                <div className="item-actions">
                  <button className="item-btn" onClick={() => onUpdate(item._id)}>Update</button>
                  <button className="item-btn" onClick={() => onDelete(item._id)}>Delete</button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewItemsAdmin;
