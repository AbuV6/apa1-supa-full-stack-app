<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { form, errors, resetForm } from "./helpers/formHandler";
import { submitFormWithValidation } from "./helpers/validators";

// Function to calculate the age based on the given date of birth
const calculateAge = (dob: string) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth();
  if (
    month < birthDate.getMonth() ||
    (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

// Watch for changes in the date of birth to update age automatically
watch(
  () => form.date_of_birth,
  (newDob) => {
    if (newDob) {
      form.age = calculateAge(newDob).toString();
    }
  }
);
</script>

<template>
  <div class="guest-form">
    <h1 class="guest-form__title">Summer Party Form</h1>

    <form @submit.prevent class="guest-form__form">
      <div class="guest-form__group">
        <label class="guest-form__label">
          Name:
          <input v-model="form.name" type="text" class="guest-form__input" />
          <span class="guest-form__error">{{ errors.name }}</span>
        </label>
        <label class="guest-form__label">
          Age (input DoB below):
          <input
            v-model="form.age"
            type="text"
            class="guest-form__input"
            readonly />
          <span class="guest-form__error">{{ errors.age }}</span>
        </label>
      </div>

      <div class="guest-form__group">
        <label class="guest-form__label">
          Phone:
          <input v-model="form.phone" type="text" class="guest-form__input" />
          <span class="guest-form__error">{{ errors.phone }}</span>
        </label>
        <label class="guest-form__label">
          Email:
          <input v-model="form.email" type="email" class="guest-form__input" />
          <span class="guest-form__error">{{ errors.email }}</span>
        </label>
      </div>

      <div class="guest-form__group">
        <label class="guest-form__label">
          Date of Birth:
          <input
            v-model="form.date_of_birth"
            type="date"
            class="guest-form__input" />
          <span class="guest-form__error">{{ errors.date_of_birth }}</span>
        </label>
      </div>

      <div class="guest-form__group">
        <label class="guest-form__label">
          Department:
          <select v-model="form.department" class="guest-form__select">
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
          <span class="guest-form__error">{{ errors.department }}</span>
        </label>
      </div>

      <div class="guest-form__group">
        <label class="guest-form__label">
          Meal Preference:
          <select v-model="form.meal_preference" class="guest-form__select">
            <option value="">Select Meal Preference</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-vegetarian">Non-Vegetarian</option>
            <option value="Halal">Halal</option>
            <option value="Kosher">Kosher</option>
            <option value="Gluten-free">Gluten-Free</option>
          </select>
          <span class="guest-form__error">{{ errors.meal_preference }}</span>
        </label>
      </div>

      <div class="guest-form__group">
        <label class="guest-form__label">
          Travelling From:
          <select v-model="form.travelling_from" class="guest-form__select">
            <option value="">Select Travelling From</option>
            <option value="Manchester">Manchester</option>
            <option value="London">London</option>
          </select>
          <span class="guest-form__error">{{ errors.travelling_from }}</span>
        </label>
      </div>

      <div class="guest-form__buttons">
        <button
          type="submit"
          class="guest-form__button"
          @click="submitFormWithValidation">
          Add
        </button>
        <button
          type="button"
          class="guest-form__button guest-form__button--reset"
          @click="resetForm">
          Reset
        </button>
        <RouterLink to="/guests" class="guest-form__link">
          <button
            type="button"
            class="guest-form__button guest-form__button--view">
            View All Guests
          </button>
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.guest-form {
  text-align: center;
  max-width: 500px;
  margin: 20px auto;
  padding: 25px;
  background: linear-gradient(135deg, #2e3192, #1bffff);
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  color: #fff;

  &__title {
    font-size: 2rem;
    font-weight: bold;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  &__group {
    margin-bottom: 15px;
  }

  &__label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    text-align: left;
    margin-bottom: 10px;
  }

  &__input,
  &__select {
    padding: 12px;
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 8px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    transition: all 0.3s ease-in-out;

    &:focus {
      border-color: #ff00ff;
      outline: none;
      box-shadow: 0 0 5px rgba(255, 0, 255, 0.5);
    }
  }

  &__error {
    font-size: 0.9rem;
    color: #ff5252;
    margin-top: 4px;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 15px;
  }

  &__button {
    width: 100%;
    padding: 14px;
    font-size: 18px;
    font-weight: bold;
    color: #1bffff;
    background: #2e3192;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    text-transform: uppercase;

    &:hover {
      background: #ff00ff;
      color: #fff;
    }

    &--reset {
      background: #ff5252;

      &:hover {
        background: #d32f2f;
      }
    }

    &--view {
      background: #1bffff;
      color: #2e3192;

      &:hover {
        background: #1bffff;
        color: #fff;
      }
    }
  }

  &__link {
    text-decoration: none;
  }
}
</style>
