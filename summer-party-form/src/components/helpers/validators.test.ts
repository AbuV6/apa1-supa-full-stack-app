import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitFormWithValidation } from "./validators";
import { supabase } from "../../lib/supabase";
import * as formHandler from "./formHandler";

// Mocking formHandler data
global.alert = vi.fn();
vi.mock("./formHandler", () => ({
  form: {
    name: "John Doe",
    age: "25",
    phone: "07123456789",
    email: "john.doe@example.com",
    date_of_birth: "1995-06-15",
    department: "HR",
    meal_preference: "Vegetarian",
    travelling_from: "London",
  },
  errors: {},
  resetForm: vi.fn(),
}));

// Mocking the supabase insert function
vi.mock("../../lib/supabase.js", () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        data: [{ id: 1, name: "John Doe" }],
        error: null,
      })),
    })),
  },
}));

describe("submitFormWithValidation", () => {
  beforeEach(() => {
    formHandler.resetForm();
    formHandler.errors = {};
  });

  it("should validate and submit the form successfully", async () => {
    const result = await submitFormWithValidation();

    // Check if alert was called
    expect(alert).toHaveBeenCalledWith("Guest added successfully!");

    // Check that validation passed and data was inserted
    expect(result).toBe(true);
    expect(supabase.from).toHaveBeenCalledWith("users");
  });

  it("should fail if form validation fails (missing name)", async () => {
    formHandler.form.name = ""; // Invalid form data (missing name)

    const result = await submitFormWithValidation();

    expect(result).toBe(false);
    expect(formHandler.errors.name).toBe("Name is required.");
  });

  it("should fail if age is invalid", async () => {
    formHandler.form.age = "150"; // Invalid age

    const result = await submitFormWithValidation();

    expect(result).toBe(false);
    expect(formHandler.errors.age).toBe("Must be a valid age");
  });

  it("should fail if phone number is invalid", async () => {
    formHandler.form.phone = "invalid-phone"; // Invalid phone number

    const result = await submitFormWithValidation();

    expect(result).toBe(false);
    expect(formHandler.errors.phone).toBe("Valid Phone Number is required");
  });

  it("should fail if email is invalid", async () => {
    formHandler.form.email = "invalid-email"; // Invalid email

    const result = await submitFormWithValidation();

    expect(result).toBe(false);
    expect(formHandler.errors.email).toBe("Must be a valid Email");
  });

  it("should fail if date of birth format is incorrect", async () => {
    formHandler.form.date_of_birth = "15-06-1995"; // Invalid date format

    const result = await submitFormWithValidation();

    expect(result).toBe(false);
    expect(formHandler.errors.date_of_birth).toBe(
      "Valid Date of Birth format required YYYY-MM-DD"
    );
  });

  it("should fail if department, meal preference or travel location is missing", async () => {
    formHandler.form.department = ""; // Missing department
    formHandler.form.meal_preference = ""; // Missing meal preference
    formHandler.form.travelling_from = ""; // Missing travelling from

    const result = await submitFormWithValidation();

    expect(result).toBe(false);
    expect(formHandler.errors.department).toBe("Please select a department");
    expect(formHandler.errors.meal_preference).toBe(
      "Please select a meal preference"
    );
    expect(formHandler.errors.travelling_from).toBe(
      "Please select where you are travelling from"
    );
  });
});
