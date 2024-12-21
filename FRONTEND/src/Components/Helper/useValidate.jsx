// import { useState } from "react";

// const useValidate = () => {
//   const [errors, setErrors] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     city: "",
//     state: "",
//     country: "",
//   });

//   const validateField = (field, value) => {
//     const newErrors = { ...errors };
//     let errorMessage = "";

//     const nameRegex = /^[A-Za-z\s]+$/;
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//     if (!value.trim()) {
//       errorMessage = `${
//         field.charAt(0).toUpperCase() + field.slice(1)
//       } is required.`;
//     } else if (field === "email" && !emailRegex.test(value)) {
//       errorMessage = "Please enter a valid email address.";
//     } else if (
//       ["firstName", "lastName", "city", "state", "country"].includes(field) &&
//       !nameRegex.test(value)
//     ) {
//       errorMessage = `${
//         field.charAt(0).toUpperCase() + field.slice(1)
//       } must contain only letters.`;
//     }

//     newErrors[field] = errorMessage;
//     setErrors(newErrors); // Update the error state with new errors

//     return !errorMessage; // Return true if no error
//   };

//   const validateAll = (formData) => {
//     let isValid = true;
//     for (const field in formData) {
//       if (!validateField(field, formData[field])) {
//         isValid = false;
//       }
//     }
//     return isValid;
//   };

//   return {
//     errors,
//     validateField,
//     validateAll,
//   };
// };

// export default useValidate;

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

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    let errorMessage = "";

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!value.trim()) {
      errorMessage = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required.`;
    } else if (field === "email" && !emailRegex.test(value)) {
      errorMessage = "Please enter a valid email address.";
    } else if (
      ["firstName", "lastName", "city", "state", "country"].includes(field) &&
      !nameRegex.test(value)
    ) {
      errorMessage = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } must contain only letters.`;
    }

    newErrors[field] = errorMessage;
    setErrors(newErrors);

    return !errorMessage; // Return true if no error
  };

  const validateAll = (formData) => {
    const fields = Object.keys(formData);
    let isValid = true;

    fields.forEach((field) => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    return isValid;
  };

  return {
    errors,
    validateField,
    validateAll,
  };
};

export default useValidate;
