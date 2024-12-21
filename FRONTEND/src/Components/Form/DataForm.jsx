import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSidebar } from "../Sidebar/SidebarContext";
import useValidate from "../Helper/useValidate";
import submitFormData from "../services/formService";

const FormPage = () => {
  const { isSidebarOpen } = useSidebar();
  const { errors, validateField, validateAll } = useValidate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    country: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the updated field
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for general validation errors
    if (!validateAll(formData)) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      const result = await submitFormData(formData);
      toast.success("Form submitted successfully!");
      console.log("Success:", result);

      setIsSubmitted(true);
      setIsEditing(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred.");
    }
  };

  const handleEdit = async () => {
    if (!validateAll(formData)) {
      toast.error("Please fix the errors before updating.");
      return;
    }

    try {
      const result = await submitFormData(formData);
      toast.success("Data updated successfully!");
      console.log("Edit Success:", result);

      handleClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred.");
    }
  };

  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      state: "",
      country: "",
    });
    setIsEditing(false);
    setIsSubmitted(false);
  };

  return (
    <div className={`content ${isSidebarOpen ? "content-shrink" : ""}`}>
      <div className="container mt-0">
        <ToastContainer />
        <div className="card shadow-lg p-5 rounded-4 border-0">
          <h2 className="text-center mb-4 fw-bold text-primary">
            {isEditing ? "Edit User Form" : "Welcome to User Form"}
          </h2>
          <p className="text-center text-muted mb-5">
            Please fill out the form below to get started.
          </p>
          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label fw-bold">
                  First Name
                </label>
                <input
                  type="text"
                  className={`form-control shadow-sm ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{errors.firstName}</div>
              </div>

              {/* Last Name */}
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label fw-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  className={`form-control shadow-sm ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{errors.lastName}</div>
              </div>
            </div>

            {/* Email */}
            <div className="row g-3 mt-3">
              <div className="col-md-12">
                <label htmlFor="email" className="form-label fw-bold">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control shadow-sm ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{errors.email}</div>
              </div>
            </div>

            {/* City */}
            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <label htmlFor="city" className="form-label fw-bold">
                  City
                </label>
                <input
                  type="text"
                  className={`form-control shadow-sm ${
                    errors.city ? "is-invalid" : ""
                  }`}
                  id="city"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{errors.city}</div>
              </div>

              {/* State */}
              <div className="col-md-6">
                <label htmlFor="state" className="form-label fw-bold">
                  State
                </label>
                <input
                  type="text"
                  className={`form-control shadow-sm ${
                    errors.state ? "is-invalid" : ""
                  }`}
                  id="state"
                  name="state"
                  placeholder="Enter your state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{errors.state}</div>
              </div>
            </div>

            {/* Country */}
            <div className="row g-3 mt-3">
              <div className="col-md-12">
                <label htmlFor="country" className="form-label fw-bold">
                  Country
                </label>
                <input
                  type="text"
                  className={`form-control shadow-sm ${
                    errors.country ? "is-invalid" : ""
                  }`}
                  id="country"
                  name="country"
                  placeholder="Enter your country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{errors.country}</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 d-flex justify-content-center flex-wrap">
              {!isEditing && !isSubmitted && (
                <button
                  type="submit"
                  className="btn btn-primary w-auto py-1 px-3 shadow-sm mb-3 mb-md-0"
                >
                  Submit
                </button>
              )}
              {isEditing && (
                <button
                  type="button"
                  className="btn btn-success w-auto py-1 px-3 shadow-sm mb-3 mb-md-0"
                  onClick={handleEdit}
                >
                  Update
                </button>
              )}
              {(isSubmitted || isEditing) && (
                <button
                  type="button"
                  className="btn btn-secondary w-auto py-1 px-3 shadow-sm mb-3 mb-md-0 mx-2"
                  onClick={handleClose}
                >
                  Close
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
