<script setup lang="ts">
import { ref, computed } from 'vue'
import GuestCard from './GuestCard.vue'
import { useGuestStore } from '../stores/guestList'
const store = useGuestStore()
import { storeToRefs } from 'pinia'
const { guests } = storeToRefs(store)
import { selectCard } from './helpers/cardData'
import { deleteCard } from './helpers/cardData'

const selectedLocation = ref('')

const filteredTableData = computed(() => {
  if (!selectedLocation.value) {
    return guests.value
  }
  return guests.value.filter((card: any) => card.travelling_from === selectedLocation.value)
})
</script>

<template>
  <div class="guest-grid">
    <label class="guest-grid__label">
      Filter by Location:
      <select v-model="selectedLocation">
        <option value="">All Locations</option>
        <option value="Manchester">Manchester</option>
        <option value="London">London</option>
      </select>
    </label>
  </div>

  <div class="guest-grid__container">
    <GuestCard
      v-for="card in filteredTableData"
      :key="card.id"
      :name="card.name"
      :age="card.age"
      :phone="card.phone"
      :travelling="card.travelling_from"
      :update="() => selectCard(card)"
      :remove="() => deleteCard(card.id)"
      :id="card.id"
      :guests="card"
    />
  </div>
</template>

<style scoped lang="scss">
.guest-grid {
  &__container {
    font-size: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    border-radius: 20px;
  }
  &__label {
    color: #007bff;
    font-size: 16px;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 5px;
    transition: color 0.3s ease-in-out;
  }

  &__label:hover {
    color: #0056b3;
  }
}
</style>
