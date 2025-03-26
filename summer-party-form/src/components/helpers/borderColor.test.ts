import { reactive, computed } from "vue";
import { describe, it, expect } from "vitest";

// Mock a component's reactive state
describe("borderColor computed", () => {
  it("should return the correct border color based on travelling_from", () => {
    // Create a reactive state for `travelling_from`
    const state = reactive({
      travelling_from: "",
    });

    // Define the computed property
    const borderColor = computed(() => {
      return state.travelling_from === "Manchester"
        ? "#FFFF00"
        : state.travelling_from === "London"
        ? "#FF0000"
        : "";
    });

    // Test for Manchester
    state.travelling_from = "Manchester";
    expect(borderColor.value).toBe("#FFFF00");

    // Test for London
    state.travelling_from = "London";
    expect(borderColor.value).toBe("#FF0000");

    // Test for other values
    state.travelling_from = "New York";
    expect(borderColor.value).toBe("");
  });
});
