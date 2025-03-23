<script setup lang="ts">
import { computed } from "vue";

const guestCard = defineProps<{
  name: String;
  age: Number;
  phone: String;
  travelling_from: String;
  update: Function;
  remove: Function;
  id: Number;
}>();

const borderColor = computed(() => {
  return guestCard.travelling_from === "Manchester"
    ? "#FFFF00"
    : guestCard.travelling_from === "London"
    ? "#FF0000"
    : "";
});
</script>

<template>
  <div class="guest-card">
    <div class="guest-card__body">
      <h5>{{ name }}</h5>
      <p>Age: {{ age }}</p>
      <p>Phone: {{ phone }}</p>
      <button @click="update">Update</button>
      <button @click="remove">Delete</button>
      <RouterLink class="guest-card__nav-link" :to="`/guest/${id}`"
        >View</RouterLink
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.guest-card {
  border: 5px solid v-bind(borderColor);
  border-radius: 12px;
  background: linear-gradient(135deg, #1bffff, #2e3192);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.1s ease-in-out;
  max-width: 350px;
  margin: auto;
  color: #fff;
  text-align: center;

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
}
</style>
