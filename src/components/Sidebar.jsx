// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to={`/${role}-dashboard`}>Dashboard</Link></li>
        {/* Add more links specific to the user role here */}
      </ul>
    </div>
  );
};

export default Sidebar;
