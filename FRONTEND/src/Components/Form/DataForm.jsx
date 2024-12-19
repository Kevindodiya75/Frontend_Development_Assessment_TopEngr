import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSidebar } from "../Sidebar/SidebarContext";

const FormPage = () => {
  const { isSidebarOpen } = useSidebar();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://test.topengr.com/api/v1/assessment/formdata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(formData);

      const result = await response.json();

      if (response.ok) {
        toast.success("Form submitted successfully!");
        console.log("Success:", result);
      } else {
        throw new Error(result.message || "Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred.");
    }
  };

  return (
    <div className={`content ${isSidebarOpen ? "content-shrink" : ""}`}>
      <div className="container mt-0">
        <ToastContainer />
        <div className="card shadow-lg p-5 rounded-4 border-0">
          <h2 className="text-center mb-4 fw-bold text-primary">
            Welcome to User Form
          </h2>
          <p className="text-center text-muted mb-5">
            Please fill out the form below to get started.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label fw-bold">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label fw-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label fw-bold">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control shadow-sm"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="city" className="form-label fw-bold">
                  City
                </label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  id="city"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <label htmlFor="state" className="form-label fw-bold">
                  State
                </label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  id="state"
                  name="state"
                  placeholder="Enter your state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="country" className="form-label fw-bold">
                  Country
                </label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  id="country"
                  name="country"
                  placeholder="Enter your country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 shadow-sm"
                style={{
                  background: "linear-gradient(to right, #007bff, #6610f2)",
                  border: "none",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
