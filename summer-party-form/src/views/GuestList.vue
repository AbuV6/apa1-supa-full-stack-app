<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabase.js";
import GuestCard from "../components/GuestCard.vue";

// Store guests from Supabase
const guests = ref([]);

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

onMounted(fetchGuests);
</script>

<template>
  <div class="guest-list">
    <h2>All Guests</h2>

    <div class="guest-list__container">
      <GuestCard
        v-for="guest in guests"
        :key="guest.id"
        :name="guest.name"
        :age="guest.age"
        :phone="guest.phone"
        :travelling_from="guest.travelling_from"
        :id="guest.id"
        :update="() => openEditModal(guest)"
        :remove="() => deleteGuest(guest.id)" />
    </div>

    <!-- Styled Edit Guest Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>Edit Guest</h3>

        <label>Name:</label>
        <input v-model="selectedGuest.name" type="text" />

        <label>Age:</label>
        <input v-model="selectedGuest.age" type="number" />

        <label>Phone:</label>
        <input v-model="selectedGuest.phone" type="text" />

        <label>Email:</label>
        <input v-model="selectedGuest.email" type="email" />

        <label>Date of Birth:</label>
        <input v-model="selectedGuest.date_of_birth" type="date" />

        <label>Department:</label>
        <select v-model="selectedGuest.department">
          <option>HR</option>
          <option>Engineering</option>
          <option>Marketing</option>
        </select>

        <label>Meal Preference:</label>
        <select v-model="selectedGuest.meal_preference">
          <option>Vegetarian</option>
          <option>Non-Vegetarian</option>
          <option>Vegan</option>
        </select>

        <label>Travelling From:</label>
        <select v-model="selectedGuest.travelling_from">
          <option>Manchester</option>
          <option>London</option>
          <option>Other</option>
        </select>

        <div class="modal-buttons">
          <button class="save-btn" @click="updateGuest">Save</button>
          <button class="cancel-btn" @click="showModal = false">Cancel</button>
        </div>
      </div>
    </div>
    <RouterLink class="guest-list__back-link" to="/">Go back</RouterLink>
  </div>
</template>

<style scoped>
.guest-list {
  text-align: center;
  padding: 20px;
}

.guest-list__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.guest-list__back-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
guest-list__back-link:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

guest-list__back-link:active {
  background-color: #004085;
  transform: scale(0.98);
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
}

.modal-content {
  background: linear-gradient(135deg, #1bffff, #2e3192);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.25);
  text-align: center;
  width: 420px;
  color: #fff;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content h3 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.modal-content label {
  display: block;
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
  color: #fff;
}

.modal-content input,
.modal-content select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  margin-top: 5px;
  background: #fff;
  color: #333;
  transition: all 0.3s ease-in-out;
}

.modal-content input:focus,
.modal-content select:focus {
  outline: none;
  box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.5);
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save-btn,
.cancel-btn {
  padding: 12px 18px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.save-btn {
  background: #ff00ff;
  color: #fff;
}

.save-btn:hover {
  background: #d300d3;
}

.cancel-btn {
  background: #ff5252;
  color: white;
}

.cancel-btn:hover {
  background: #d32f2f;
}

@keyframes fadeIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
