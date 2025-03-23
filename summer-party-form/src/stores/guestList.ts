import { defineStore } from "pinia";
import { ref } from "vue";

export const useGuestStore = defineStore("guests", () => {
  const guests = ref([
    {
      age: "22",
      department: "HR",
      date_of_birth: "11/11/1991",
      email: "bakz@vali.co.uk",
      id: 1719399045530,
      meal_preference: "Non-vegetarian",
      name: "bakz",
      phone: "07762365252",
      travelling_from: "Manchester",
    },
    {
      age: "22",
      department: "HR",
      date_of_birth: "11/11/1991",
      email: "bakz@vali.co.uk",
      id: 1719399045532,
      meal_preference: "Non-vegetarian",
      name: "bakz",
      phone: "07762365252",
      travelling_from: "London",
    },
  ]);

  function addGuest(guest: any) {
    guests.value.push(guest);
  }

  return { guests, addGuest };
});
