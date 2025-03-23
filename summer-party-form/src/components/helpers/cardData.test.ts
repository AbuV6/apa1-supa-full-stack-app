import {
  deleteCard,
  selectCard,
  selectedCardId,
  isUpdateMode,
} from "./tableData";
import { useGuestStore } from "../../stores/guestList";
import { expect, it, describe, beforeAll, vi } from "vitest";
import { submitForm } from "./validators";
import { reactive, createApp } from "vue";
import { setActivePinia, createPinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { form } from "./formHandler";

describe("testing deleteCard function", () => {
  let guestStore;

  beforeAll(() => {
    const app = createApp({});
    setActivePinia(
      createTestingPinia({
        createSpy: vi.fn,
        initialState: {
          guests: {
            guests: [
              {
                id: 1,
                name: "abu",
                age: 22,
                phone: "07553841895",
                email: "abu@abu.com",
                date_of_birth: "22/05/2002",
                department: "HR",
                meal_preference: "Halal",
                travelling_from: "Manchester",
              },

              {
                id: 2,
                name: "sonny",
                age: 22,
                phone: "07553841896",
                email: "abu@abu.com",
                date_of_birth: "22/05/2002",
                department: "HR",
                meal_preference: "Halal",
                travelling_from: "Manchester",
              },
            ],
          },
        },
      })
    );
    guestStore = useGuestStore();
  });

  it("checks if the deleteCard function removes the object", () => {
    deleteCard(1);

    expect(guestStore.guests).toEqual([
      {
        id: 2,
        name: "sonny",
        age: 22,
        phone: "07553841896",
        email: "abu@abu.com",
        date_of_birth: "22/05/2002",
        department: "HR",
        meal_preference: "Halal",
        travelling_from: "Manchester",
      },
    ]);
  });
});
