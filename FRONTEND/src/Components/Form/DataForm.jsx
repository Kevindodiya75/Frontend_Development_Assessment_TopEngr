import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSidebar } from "../Sidebar/SidebarContext";
import useValidate from "../Helper/useValidate"; // Import the validation hook
import submitFormData from "../services/formService"; // Import the service function

const FormPage = () => {
  const { isSidebarOpen } = useSidebar();
  const { errors, validate } = useValidate(); // Destructure the hook

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    country: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Track editing mode
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission

  // Validate the entire form data
  const validateForm = () => {
    const isValid = validate(formData);
    if (!isValid) {
      toast.error(
        "Please fill out all required fields correctly before submitting."
      );
    }
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate on field change
    validate({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await submitFormData(formData);
      toast.success("Form submitted successfully!");
      console.log("Success:", result);

      setIsSubmitted(true); // Mark the form as submitted
      setIsEditing(false); // Disable editing after submission
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred.");
    }
  };

  const handleEdit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const result = await submitFormData(formData);
      toast.success("Data updated successfully!");
      console.log("Edit Success:", result);

      handleClose(); // After updating, reset the form
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred.");
    }
  };

  const handleClose = () => {
    // Clear the form, reset validation errors, and hide buttons
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      state: "",
      country: "",
    });
    setIsEditing(false); // Exit editing mode
    setIsSubmitted(false); // Show Submit button
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
            <div className="row g-3 mt-3">
              <div className="col-md-6">
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
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">{errors.email}</div>
              </div>
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
            </div>
            <div className="row g-3 mt-3">
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
              <div className="col-md-6">
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
            <div className="mt-4">
              {!isSubmitted ? (
                <button
                  type="submit"
                  className="btn btn-primary w-25 py-2 shadow-sm "
                  onClick={handleSubmit}
                  style={{
                    background: "linear-gradient(to right, #007bff, #6610f2)",
                    border: "none",
                  }}
                >
                  {isEditing ? "Update" : "Submit"}
                </button>
              ) : (
                <div className="mt-3 d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handleEdit}
                    style={{
                      background: "#ffc107",
                      border: "none",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClose}
                    style={{
                      background: "#6c757d",
                      border: "none",
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
