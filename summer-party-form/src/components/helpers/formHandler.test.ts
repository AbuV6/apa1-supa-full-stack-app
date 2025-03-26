import { form, errors, resetForm } from "./formHandler"; // Update the path accordingly
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("resetForm", () => {
  it("should reset form and errors to empty values", () => {
    // Set some initial values in form and errors
    form.name = "John Doe";
    form.age = "30";
    form.phone = "07123456789";
    form.email = "john.doe@example.com";
    errors.name = "Required field";
    errors.age = "Invalid age";
    errors.phone = "Invalid phone number";

    // Call resetForm
    resetForm();

    // Assert that all form and error fields are cleared
    expect(form.name).toBe("");
    expect(form.age).toBe("");
    expect(form.phone).toBe("");
    expect(form.email).toBe("");
    expect(errors.name).toBe("");
    expect(errors.age).toBe("");
    expect(errors.phone).toBe("");
  });
});
