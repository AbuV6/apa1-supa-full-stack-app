<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
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
  <div class="guest-details">
    <div class="guest-details__card">
      <div class="guest-details__info">
        <strong>Name:</strong> {{ guest.name }}
      </div>
      <div class="guest-details__info">
        <strong>Age:</strong> {{ guest.age }}
      </div>
      <div class="guest-details__info">
        <strong>Phone:</strong> {{ guest.phone }}
      </div>
      <div class="guest-details__info">
        <strong>Email:</strong> {{ guest.email }}
      </div>
      <div class="guest-details__info">
        <strong>Date of Birth:</strong> {{ guest.date_of_birth }}
      </div>
      <div class="guest-details__info">
        <strong>Department:</strong> {{ guest.department }}
      </div>
      <div class="guest-details__info">
        <strong>Meal Preference:</strong> {{ guest.meal_preference }}
      </div>
      <div class="guest-details__info">
        <strong>Travelling From:</strong> {{ guest.travelling_from }}
      </div>
    </div>

    <RouterLink class="guest-details__back-link" to="/guests"
      >Go back</RouterLink
    >
  </div>
</template>

<style scoped lang="scss">
.guest-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 40px auto;
  max-width: 400px;

  &__card {
    border: 5px solid v-bind(borderColor);
    border-radius: 12px;
    background: linear-gradient(135deg, #1bffff, #2e3192);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    padding: 20px;
    width: 100%;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.25);
    }
  }

  &__info {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
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
</style>
