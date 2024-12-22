import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SidebarProvider } from "./Components/Sidebar/SidebarContext";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header"; // Import the Header component
import Dashboard from "./Components/Dashboard/Dashboard";
import Form from "./Components/Form/DataForm";
import Footer from "./Components/Footer/Footer";

const App = () => {
  return (
    <SidebarProvider>
      <Router>
        <Sidebar />
        <div className="main-layout">
          {/* Add Header */}
          <Header />
          {/* Routes for pages */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/form" element={<Form />} />
            {/* Add other routes here */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </SidebarProvider>
  );
};

export default App;
