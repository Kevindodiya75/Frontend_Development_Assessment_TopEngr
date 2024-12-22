import React from "react";
import "./Header.css";
import photo from "../../../public/vite.svg";
import { useSidebar } from "../Sidebar/SidebarContext";
import avtar from "../../assets/graphic-designer-digital-avatar-generative-ai_934475-9292.avif";

const Header = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <header className={`dashboard-header `}>
      <div className="logo d-flex align-items-center ">
        <img src={photo} alt="Logo" className="logo-img " />
        <h2 className="dashboard-title ms-2">Dashboard</h2>
      </div>

      <div className="user-info d-flex align-items-center  ms-2">
        <img
          src={avtar}
          alt="User Avatar"
          className="rounded-circle user-avatar  ms-2"
          style={{ height: "40px", width: "40px" }}
        />
      </div>
    </header>
  );
};

export default Header;
