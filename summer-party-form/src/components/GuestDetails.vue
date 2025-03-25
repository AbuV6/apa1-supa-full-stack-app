<script setup lang="ts">
import { computed, onMounted, ref, defineProps } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "../lib/supabase";

// Accept 'id' as a prop, removes vue warning in browser
const props = defineProps({
  id: String,
});

const guest = ref("");
const loading = ref(true);

const route = useRoute();
onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", route.params.id)
      .single(); // Fetch one record

    if (error) {
      throw new Error(error.message);
    } else {
      guest.value = data; // Assign the fetched data to guest
    }
  } catch (error) {
    console.error("Error fetching guest:", error);
  } finally {
    loading.value = false;
  }
});

const borderColor = computed(() => {
  return guest.value?.travelling_from === "Manchester"
    ? "#FFFF00"
    : guest.value?.travelling_from === "London"
    ? "#FF0000"
    : "#000";
});
</script>

<template>
  <div>
    <div class="guest-details">
      <div>Name: {{ guest.name }}</div>
      <div>Age: {{ guest.age }}</div>
      <div>Phone: {{ guest.phone }}</div>
      <div>Email: {{ guest.email }}</div>
      <div>Date Of Birth: {{ guest.date_of_birth }}</div>
      <div>Department: {{ guest.department }}</div>
      <div>Meal Preference: {{ guest.meal_preference }}</div>
      <div>Travelling From: {{ guest.travelling_from }}</div>
    </div>
    <div>
      <RouterLink class="guest-details__back-link" to="/guests"
        >Go back</RouterLink
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.guest-details {
  border: 5px solid v-bind(borderColor);
  border-radius: 12px;
  background: linear-gradient(135deg, #1bffff, #2e3192);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  max-width: 350px;
  margin: auto;
  color: #fff;
  text-align: center;
  padding: 20px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.25);
  }

  &__body {
    padding: 24px;

    h5 {
      font-size: 1.8rem;
      font-weight: bold;
      color: #fff;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 6px;
    }
  }

  button {
    padding: 12px 18px;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin: 6px;

    &:first-child {
      background: #ff00ff;
      color: #fff;

      &:hover {
        background: #d300d3;
      }
    }

    &:nth-child(2) {
      background: #ff5252;
      color: white;

      &:hover {
        background: #d32f2f;
      }
    }
  }

  &__nav-link {
    display: inline-block;
    background: #ff00ff;
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
    padding: 12px 18px;
    border-radius: 8px;
    margin-top: 10px;
    transition: all 0.3s ease-in-out;

    &:hover {
      background: #d300d3;
    }
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
  }

  &__back-link:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &__back-link:active {
    background-color: #004085;
    transform: scale(0.98);
  }

  .loading {
    font-size: 1.2rem;
    color: #fff;
    text-align: center;
    margin-top: 50px;
  }
}
</style>
