// validationSchema.js
import * as yup from "yup";

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .matches(/^[A-Za-z]+$/, "First Name must only contain letters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .matches(/^[A-Za-z]+$/, "Last Name must only contain letters"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  city: yup
    .string()
    .required("City is required")
    .matches(/^[A-Za-z]+$/, "City must only contain letters"),
  state: yup
    .string()
    .required("State is required")
    .matches(/^[A-Za-z]+$/, "state must only contain letters"),
  country: yup
    .string()
    .required("Country is required")
    .matches(/^[A-Za-z]+$/, "Country must only contain letters"),
});
