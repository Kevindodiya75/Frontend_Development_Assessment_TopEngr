import React from "react";
import "./Header.css";
import photo from "../../../public/vite.svg";
import { useSidebar } from "../Sidebar/SidebarContext";

const Header = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <header
      className={`dashboard-header ${
        isSidebarOpen ? "header-expanded" : "header-shrunk"
      }`}
    >
      <div className="logo d-flex align-items-center">
        <img
          src={photo}
          alt="Logo"
          className="logo-img me-2"
          style={{
            height: isSidebarOpen ? "60px" : "40px",
            transition: "height 0.3s ease",
          }}
        />
        <h2
          className={`dashboard-title ${
            isSidebarOpen ? "title-large" : "title-small"
          }`}
        >
          Dashboard
        </h2>
      </div>
      <div className="user-info d-flex align-items-center">
        <span
          className={`welcome-text ${
            isSidebarOpen ? "text-large" : "text-small"
          }`}
        >
          Welcome, User!
        </span>
        <img
          src="/path/to/user-avatar.png"
          alt="User Avatar"
          className="rounded-circle user-avatar"
          style={{
            height: isSidebarOpen ? "50px" : "40px",
            width: isSidebarOpen ? "50px" : "40px",
            transition: "height 0.3s ease, width 0.3s ease",
          }}
        />
      </div>
    </header>
  );
};

export default Header;
