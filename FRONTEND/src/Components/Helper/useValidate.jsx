// useValidate.js
import { useState } from "react";

const useValidate = () => {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    country: "",
  });

  const validate = (formData) => {
    const newErrors = { ...errors };

    // Regular expression to allow only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;

    // Validate firstName
    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName = "First name must contain only letters.";
    } else {
      newErrors.firstName = "";
    }

    // Validate lastName
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required.";
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName = "Last name must contain only letters.";
    } else {
      newErrors.lastName = "";
    }

    // Validate email (basic check for valid email format)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    } else {
      newErrors.email = "";
    }

    // Validate city
    if (!formData.city) {
      newErrors.city = "City is required.";
    } else if (!nameRegex.test(formData.city)) {
      newErrors.city = "City must contain only letters.";
    } else {
      newErrors.city = "";
    }

    // Validate state
    if (!formData.state) {
      newErrors.state = "State is required.";
    } else if (!nameRegex.test(formData.state)) {
      newErrors.state = "State must contain only letters.";
    } else {
      newErrors.state = "";
    }

    // Validate country
    if (!formData.country) {
      newErrors.country = "Country is required.";
    } else if (!nameRegex.test(formData.country)) {
      newErrors.country = "Country must contain only letters.";
    } else {
      newErrors.country = "";
    }

    setErrors(newErrors);

    // Return true if no errors are found
    return !Object.values(newErrors).some((error) => error !== "");
  };

  return {
    errors,
    validate,
  };
};

export default useValidate;
