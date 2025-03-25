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
      <h5 class="guest-card__name">{{ name }}</h5>
      <p class="guest-card__info">Age: {{ age }}</p>
      <p class="guest-card__info">Phone: {{ phone }}</p>
      <div class="guest-card__actions">
        <button
          class="guest-card__button guest-card__button--update"
          @click="update">
          Update
        </button>
        <button
          class="guest-card__button guest-card__button--delete"
          @click="remove">
          Delete
        </button>
        <RouterLink class="guest-card__link" :to="`/guest/${id}`"
          >View</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.guest-card {
  border: 5px solid v-bind(borderColor);
  border-radius: 12px;
  background: linear-gradient(135deg, #1bffff, #2e3192);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.1s ease-in-out;
  max-width: 350px;
  margin: auto;
  text-align: center;
  color: #fff;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.25);
  }

  &__body {
    padding: 24px;
  }

  &__name {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  &__info {
    font-size: 16px;
    margin-bottom: 6px;
  }

  &__actions {
    margin-top: 12px;
  }

  &__button {
    padding: 12px 18px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin: 6px;

    &--update {
      background: #004085;
      color: #fff;

      &:hover {
        background: #d300d3;
      }
    }

    &--delete {
      background: #ff5252;
      color: white;

      &:hover {
        background: #d32f2f;
      }
    }
  }

  &__link {
    display: inline-block;
    background: #ff00ff;
    color: #fff;
    text-decoration: none;
    font-size: 16px;
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
