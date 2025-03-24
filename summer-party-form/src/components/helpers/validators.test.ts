import { expect, it, describe, beforeAll, vi } from "vitest";
import { submitForm } from "./validators";
import { reactive, createApp } from "vue";
import { form } from "./formHandler";

describe("testing validator function", () => {
  const app = createApp({});
  beforeAll(() => {
    form.name = "abu";
    form.age = 22;
    form.phone = "07553841895";
    form.email = "abu@abu.com";
    form.date_of_birth = "22/05/2002";
    form.department = "HR";
    form.meal_preference = "Halal";
    form.travelling_from = "Manchester";
  });

  it("validator good information", () => {
    expect(submitForm()).toBe(true);
  });
});

describe("testing validator function", () => {
  const app = createApp({});
  beforeAll(() => {
    form.name = "sonny";
  });

  it("validator bad information", () => {
    expect(submitForm()).toBe(false);
  });
});
