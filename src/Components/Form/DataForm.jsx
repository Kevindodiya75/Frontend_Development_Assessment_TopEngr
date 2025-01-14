import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../Helper/validationSchema";
import { toast } from "react-toastify";
import ToastConfig from "../Helper/ToastConfig";
import submitFormData from "../services/formService";
import { useSidebar } from "../Sidebar/SidebarContext";

const DataForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isEditing, setIsEditing] = useState(false);
  const { isSidebarOpen } = useSidebar();

  const onSubmit = async (data) => {
    try {
      await submitFormData(data);
      toast.success("Form submitted successfully!");
      setIsEditing(true);
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    }
  };

  const onUpdate = async (data) => {
    try {
      await submitFormData(data);
      toast.success("Form updated successfully!");
      reset();
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    }
  };

  const onClose = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className={`content ${isSidebarOpen ? "content-shrink" : ""}`}>
      <div className="container mt-0">
        {/* Use the ToastConfig component */}
        <ToastConfig />
        <div className="card shadow-lg p-5 rounded-4 border-0">
          <h2 className="text-center mb-4 fw-bold text-primary">
            Welcome to User Form
          </h2>
          <p className="text-center text-muted mb-5">
            Please fill out the form below to get started.
          </p>
          <form onSubmit={handleSubmit(isEditing ? onUpdate : onSubmit)}>
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
                  placeholder="Enter your first name"
                  {...register("firstName")}
                  onKeyUp={() => trigger("firstName")}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">
                    {errors.firstName.message}
                  </div>
                )}
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
                  placeholder="Enter your last name"
                  {...register("lastName")}
                  onKeyUp={() => trigger("lastName")}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">
                    {errors.lastName.message}
                  </div>
                )}
              </div>
            </div>
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
                  placeholder="Enter your email"
                  {...register("email")}
                  onKeyUp={() => trigger("email")}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>
            </div>
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
                  placeholder="Enter your city"
                  {...register("city")}
                  onKeyUp={() => trigger("city")}
                />
                {errors.city && (
                  <div className="invalid-feedback">{errors.city.message}</div>
                )}
              </div>
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
                  placeholder="Enter your state"
                  {...register("state")}
                  onKeyUp={() => trigger("state")}
                />
                {errors.state && (
                  <div className="invalid-feedback">{errors.state.message}</div>
                )}
              </div>
            </div>
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
                  placeholder="Enter your country"
                  {...register("country")}
                  onKeyUp={() => trigger("country")}
                />
                {errors.country && (
                  <div className="invalid-feedback">
                    {errors.country.message}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 d-flex justify-content-center gap-3">
              {!isEditing && (
                <button
                  type="submit"
                  className="btn btn-primary w-auto py-1 px-3 shadow-sm"
                >
                  Submit
                </button>
              )}
              {isEditing && (
                <>
                  <button
                    type="submit"
                    className="btn btn-success w-auto py-1 px-3 shadow-sm"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-secondary w-auto py-1 px-3 shadow-sm"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataForm;
