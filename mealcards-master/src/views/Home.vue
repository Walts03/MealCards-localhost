<template>
  <section class="py-10 bg-gray-100">
    <Meals :meals="meals" />
  </section>
  <Footer></Footer>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Footer from "../components/Footer.vue";
import store from "../store";
import Meals from "../components/Meals.vue";
import axiosClient from "../axiosClient.js";
import { useRouter } from "vue-router";

const meals = ref([]);
const router = useRouter();
onMounted(async () => {
  for (let i = 0; i < 9; i++) {
    axiosClient
      .get(`random.php`)
      .then(({ data }) => meals.value.push(data.meals[0]));
  }
});

onMounted(() => {
  let user = localStorage.getItem("user-info");
  if (!user) {
    router.push({ name: "Signup" });
  }
});
</script>
