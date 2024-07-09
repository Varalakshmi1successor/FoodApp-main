import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust the path according to your folder structure
import './AdminMainPage.css'; // Your custom CSS for the admin page

function AdminMainPage() {
  return (
    <div className="admin-main-page">
      <Navbar />
      <div className="content">
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
}

export default AdminMainPage;
