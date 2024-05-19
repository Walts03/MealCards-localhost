<template>
  <div class="flex justify-center space-x-2 p-4 bg-white shadow-lg rounded-lg">
    <router-link
      :to="{ name: 'byLetter', params: { letter } }"
      v-for="letter of letters"
      :class="{
        'bg-blue-500 text-white': selectedLetter === letter,
      }"
      :key="letter"
    >
      {{ letter }}
    </router-link>
  </div>
  <Meals :meals="meals" />
</template>
<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import store from "../store";
import Meals from "../components/Meals.vue";
const route = useRoute();
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const meals = computed(() => store.state.mealsByLetter);
watch(route, () => {
  store.dispatch("searchMealsByLetter", route.params.letter);
});
onMounted(() => {
  store.dispatch("searchMealsByLetter", route.params.letter);
});
</script>
