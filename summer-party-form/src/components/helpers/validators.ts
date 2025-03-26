import { form, errors, resetForm } from "./formHandler.js";
import { supabase } from "../../lib/supabase.js";

// Function to validate and submit form data to Supabase
export const submitFormWithValidation = async () => {
  // Validate the form
  errors.name = form.name ? "" : "Name is required.";

  const ageRegEx = /^(0|[1-9][0-9]?|100)$/;
  errors.age = form.age
    ? ageRegEx.test(form.age)
      ? ""
      : "Must be a valid age"
    : "Age is required.";

  const phoneNumberRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
  errors.phone = form.phone
    ? phoneNumberRegex.test(form.phone)
      ? ""
      : "Valid Phone Number is required"
    : "Phone Number is required.";

  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  errors.email = form.email
    ? emailRegEx.test(form.email)
      ? ""
      : "Must be a valid Email"
    : "Email is required.";

  const date_of_birthRegEx =
    /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  errors.date_of_birth = form.date_of_birth
    ? date_of_birthRegEx.test(form.date_of_birth)
      ? ""
      : "Valid Date of Birth format required YYYY-MM-DD"
    : "Date of Birth is required.";

  errors.department = form.department ? "" : "Please select a department";
  errors.meal_preference = form.meal_preference
    ? ""
    : "Please select a meal preference";
  errors.travelling_from = form.travelling_from
    ? ""
    : "Please select where you are travelling from";

  // Check if there are any errors
  if (Object.values(errors).some((error) => error !== "")) {
    console.error("Form validation failed:", errors);
    return false;
  }

  // If form is valid, insert into Supabase
  try {
    const { data, error } = await supabase.from("users").insert([{ ...form }]);

    if (error) {
      console.error("Error inserting data:", error.message);
      return false;
    }

    console.log("Data inserted successfully:", data);
    alert("Guest added successfully!");

    resetForm(); // Reset form after successful submission
    return true;
  } catch (err) {
    console.error("Unexpected error:", err);
    return false;
  }
};
