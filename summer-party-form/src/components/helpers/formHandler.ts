import { reactive } from "vue";

// Define form data and table data
export const form = reactive({
  name: "",
  age: "",
  phone: "",
  email: "",
  date_of_birth: "",
  department: "",
  meal_preference: "",
  travelling_from: "",
});

export const errors = reactive({
  name: "",
  age: "",
  phone: "",
  email: "",
  date_of_birth: "",
  department: "",
  meal_preference: "",
  travelling_from: "",
});

// Reset form
export const resetForm = () => {
  Object.keys(form).forEach((key) => (form[key] = ""));
  Object.keys(errors).forEach((key) => (errors[key] = ""));
};
