import { computed } from 'vue'

export const borderColor = computed(() => {
  return this.travelling_from === 'Manchester'
    ? '#FFFF00'
    : this.travelling_from === 'London'
      ? '#FF0000'
      : ''
})
