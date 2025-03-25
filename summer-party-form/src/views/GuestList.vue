<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { supabase } from "../lib/supabase.js";
import GuestCard from "../components/GuestCard.vue";

// Store guests from Supabase
const guests = ref([]);

// Default filter: show all guests
const selectedFilter = ref("All");

// State for edit modal
const showModal = ref(false);
const selectedGuest = ref({
  id: null,
  name: "",
  age: "",
  phone: "",
  email: "",
  date_of_birth: "",
  department: "",
  meal_preference: "",
  travelling_from: "",
});

// Fetch guests from Supabase
const fetchGuests = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    console.error("Error fetching guests:", error.message);
  } else {
    guests.value = data;
  }
};

// Open modal & populate with selected guest's data
const openEditModal = (guest) => {
  selectedGuest.value = { ...guest };
  showModal.value = true;
};

// Update guest in Supabase
const updateGuest = async () => {
  const { id, ...updatedData } = selectedGuest.value;

  const { error } = await supabase
    .from("users")
    .update(updatedData)
    .eq("id", id);

  if (error) {
    console.error("Error updating guest:", error.message);
  } else {
    showModal.value = false;
    fetchGuests(); // Refresh list after update
    console.log(`Guest ID ${id} updated successfully.`);
  }
};

// Handle Delete
const deleteGuest = async (guestId: number) => {
  const { error } = await supabase.from("users").delete().eq("id", guestId);
  if (error) {
    console.error("Error deleting guest:", error.message);
  } else {
    guests.value = guests.value.filter((guest) => guest.id !== guestId);
    console.log(`Guest ID ${guestId} deleted successfully.`);
  }
};

// Computed property to filter guests
const filteredGuests = computed(() => {
  if (selectedFilter.value === "All") {
    return guests.value;
  }
  return guests.value.filter(
    (guest) => guest.travelling_from === selectedFilter.value
  );
});

onMounted(fetchGuests);
</script>

<template>
  <div class="guest-list">
    <div class="guest-list__filter">
      <label for="filter">Filter by City:</label>
      <select v-model="selectedFilter">
        <option value="All">All</option>
        <option value="Manchester">Manchester</option>
        <option value="London">London</option>
      </select>
    </div>

    <h2 class="guest-list__title">All Guests</h2>

    <div class="guest-list__container">
      <GuestCard
        v-for="guest in filteredGuests"
        :key="guest.id"
        :name="guest.name"
        :age="guest.age"
        :phone="guest.phone"
        :travelling_from="guest.travelling_from"
        :id="guest.id"
        :update="() => openEditModal(guest)"
        :remove="() => deleteGuest(guest.id)" />
    </div>

    <!-- Edit Guest Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal__content">
        <h3 class="modal__title">Edit Guest</h3>

        <label class="modal__label">Name:</label>
        <input v-model="selectedGuest.name" type="text" class="modal__input" />

        <label class="modal__label">Age:</label>
        <input v-model="selectedGuest.age" type="number" class="modal__input" />

        <label class="modal__label">Phone:</label>
        <input v-model="selectedGuest.phone" type="text" class="modal__input" />

        <label class="modal__label">Email:</label>
        <input
          v-model="selectedGuest.email"
          type="email"
          class="modal__input" />

        <label class="modal__label">Date of Birth:</label>
        <input
          v-model="selectedGuest.date_of_birth"
          type="date"
          class="modal__input" />

        <label class="modal__label">Department:</label>
        <select v-model="selectedGuest.department" class="modal__input">
          <option>HR</option>
          <option>Engineering</option>
          <option>Marketing</option>
        </select>

        <label class="modal__label">Meal Preference:</label>
        <select v-model="selectedGuest.meal_preference" class="modal__input">
          <option>Vegetarian</option>
          <option>Non-Vegetarian</option>
          <option>Vegan</option>
        </select>

        <label class="modal__label">Travelling From:</label>
        <select v-model="selectedGuest.travelling_from" class="modal__input">
          <option>Manchester</option>
          <option>London</option>
          <option>Other</option>
        </select>

        <div class="modal__buttons">
          <button
            class="modal__button modal__button--save"
            @click="updateGuest">
            Save
          </button>
          <button
            class="modal__button modal__button--cancel"
            @click="showModal = false">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <RouterLink class="guest-list__back-link" to="/">Go back</RouterLink>
  </div>
</template>

<style scoped lang="scss">
.guest-list {
  text-align: center;
  padding: 20px;

  &__filter {
    margin-bottom: 20px;

    label {
      margin-right: 10px;
      font-weight: bold;
    }

    select {
      padding: 5px;
      font-size: 16px;
    }
  }

  &__title {
    font-size: 40px;
    margin-bottom: 20px;
  }

  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  &__back-link {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #0056b3;
      transform: scale(1.05);
    }

    &:active {
      background-color: #004085;
      transform: scale(0.98);
    }
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    background: linear-gradient(135deg, #1bffff, #2e3192);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.25);
    text-align: center;
    width: 420px;
    color: #fff;
    animation: fadeIn 0.3s ease-in-out;
  }

  &__title {
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  &__label {
    display: block;
    text-align: left;
    font-size: 28 px;
    font-weight: bold;
    margin-top: 10px;
    color: #fff;
  }

  &__input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    margin-top: 5px;
    background: #fff;
    color: #333;
    transition: all 0.3s ease-in-out;

    &:focus {
      outline: none;
      box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.5);
    }
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  &__button {
    padding: 12px 18px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &--save {
      background: #ff00ff;
      color: #fff;

      &:hover {
        background: #d300d3;
      }
    }

    &--cancel {
      background: #ff5252;
      color: white;

      &:hover {
        background: #d32f2f;
      }
    }
  }
}
</style>
