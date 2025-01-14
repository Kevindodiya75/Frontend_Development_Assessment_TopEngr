import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "./SidebarContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        if (isSidebarOpen) {
          toggleSidebar();
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarOpen, toggleSidebar]);

  return (
    <div className="d-flex">
      <div
        ref={toggleRef}
        className={`menu-toggle ${isSidebarOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div
        ref={sidebarRef}
        className={`sidebar ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className={`sidebar-content ${isSidebarOpen ? "" : "collapsed"}`}>
          <div className="p-3 text-center text-white">{isSidebarOpen}</div>
          <nav className="nav flex-column px-3">
            <NavLink
              to="/"
              className="nav-link text-white"
              onClick={toggleSidebar}
            >
              <i className="bi bi-house-fill"></i>
              {isSidebarOpen && <span className="ms-2">Home</span>}
            </NavLink>
            <NavLink
              to="/form"
              className="nav-link text-white"
              onClick={toggleSidebar}
            >
              <i className="bi bi-file-earmark-break-fill"></i>
              {isSidebarOpen && <span className="ms-2">Form</span>}
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
