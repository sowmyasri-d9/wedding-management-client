import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Sidebar.css";

const Sidebar = ({ setSelectedCategory }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const handleSectionClick = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <aside className="sidebar">
      <div className="profile">
        <img
          src="https://img.icons8.com/?size=100&id=23235&format=png&color=000000"
          alt="Profile"
        />
        <h3>Admin</h3>
      </div>
      <ul className="admin-actions">
        {/* DJ Section */}
        <li>
          <div className="section-header" onClick={() => handleSectionClick("dj")}>
            DJ
          </div>
          {expandedSection === "dj" && (
            <ul className="sub-options">
              <li>
                <Link to="/admin/add-dj" className="add-style">Add DJ</Link>
              </li>
              <li>
                <button onClick={() => setSelectedCategory("djs")} className="add-style">View DJs</button> {/* Call function */}
              </li>
            </ul>
          )}
        </li>

        {/* Food Caterer Section */}
        <li>
          <div className="section-header" onClick={() => handleSectionClick("food-caterers")}>
            Food Caterer
          </div>
          {expandedSection === "food-caterers" && (
            <ul className="sub-options">
              <li>
                <Link to="/admin/add-food-caterer" className="add-style">Add Food Caterer</Link>
              </li>
              <li>
                <button onClick={() => setSelectedCategory("food-caterers")} className="add-style">View Food Caterers</button>
              </li>
            </ul>
          )}
        </li>

        {/* Venue Section */}
        <li>
          <div className="section-header" onClick={() => handleSectionClick("venue")}>
            Venue
          </div>
          {expandedSection === "venue" && (
            <ul className="sub-options">
              <li>
                <Link to="/admin/add-venue" className="add-style">Add Venue</Link>
              </li>
              <li>
                <button onClick={() => setSelectedCategory("venue")} className="add-style">View Venue</button>
              </li>
            </ul>
          )}
        </li>

        {/* Wedding Type Section */}
        <li>
          <div className="section-header" onClick={() => handleSectionClick("wedding-types")}>
            Wedding Type
          </div>
          {expandedSection === "wedding-types" && (
            <ul className="sub-options">
              <li>
                <Link to="/admin/add-wedding-type" className="add-style">Add Wedding Type</Link>
              </li>
              <li>
                <button onClick={() => setSelectedCategory("wedding-types")} className="add-style">View Wedding Types</button>
              </li>
            </ul>
          )}
        </li>
        {/* Photography Section */}
        <li>
          <div className="section-header" onClick={() => handleSectionClick("photography")}>
          Photography
          </div>
          {expandedSection === "photography" && (
            <ul className="sub-options">
              <li>
                <Link to="/admin/add-photography" className="add-style">Add Photographer</Link>
              </li>
              <li>
                <button onClick={() => setSelectedCategory("photography")} className="add-style">View Photographers</button>
              </li>
            </ul>
          )}
        </li>

        {/* Decoration Section */}
        <li>
          <div className="section-header" onClick={() => handleSectionClick("decorations")}>
          Decoration
          </div>
          {expandedSection === "decorations" && (
            <ul className="sub-options">
              <li>
                <Link to="/admin/add-decorator" className="add-style">Add Decorator</Link>
              </li>
              <li>
                <button onClick={() => setSelectedCategory("decorations")} className="add-style">View Decorators</button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
