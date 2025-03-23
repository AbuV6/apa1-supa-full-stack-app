import { ref, computed } from "vue";
import { form } from "./formHandler";
import { useGuestStore } from "../../stores/guestList";
export const cardData = ref<
  {
    id: number;
    name: string;
    age: number;
    phone: string;
    email: string;
    date_of_birth: number;
    department: string;
    meal_preference: string;
    travelling_from: string;
  }[]
>([]);

export const selectedCardId = ref<number | null>(null);

// Delete a card from the grid
export const deleteCard = (id: number) => {
  const guestStore = useGuestStore();
  guestStore.guests = guestStore.guests.filter((card) => card.id !== id);
};

// update mode
export const isUpdateMode = computed(() => selectedCardId.value !== null);

// Populate form with selected card data
export const selectCard = (card: {
  id: number;
  name: string;
  age: number;
  phone: string;
  email: string;
  date_of_birth: number;
  department: string;
  meal_preference: string;
  travelling_from: string;
}) => {
  Object.assign(form, card);
  selectedCardId.value = card.id;
};
