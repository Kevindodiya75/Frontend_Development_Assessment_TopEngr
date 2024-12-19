import React from "react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "./SidebarContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className="d-flex">
      {/* Sidebar Toggle Button */}
      <div
        className={`menu-toggle ${isSidebarOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className={`sidebar-content ${isSidebarOpen ? "" : "collapsed"}`}>
          <div className="p-3 text-center text-white">
            {isSidebarOpen && <h4>My Sidebar</h4>}
          </div>
          <nav className="nav flex-column px-3">
            <NavLink to="/" className="nav-link text-white">
              <i className="bi bi-house-fill"></i>
              {isSidebarOpen && <span className="ms-2">Home</span>}
            </NavLink>
            <NavLink to="/form" className="nav-link text-white">
              <i className="bi bi-person-fill"></i>
              {isSidebarOpen && <span className="ms-2">About</span>}
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
