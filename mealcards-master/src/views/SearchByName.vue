<template>
  <div>
    <div class="p-8 pb-0">
      <input
        type="text"
        v-model="keyword"
        class="rounded border-2 bg-white border-gray-200 w-full"
        placeholder="Search for Meals"
        @change="searchMeals"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 p-8">
      <MealItem
        v-for="meal in paginatedMeals"
        :key="meal.idMeal"
        :meal="meal"
      ></MealItem>
    </div>
    <PaginateControl
      :pageSize="pagination.pageSize"
      :totalItems="pagination.totalItems"
      @update:page="changePage"
    />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import store from "../store";
import MealItem from "../components/MealItem.vue";
import PaginateControl from "../components/PaginateControl.vue";

const route = useRoute();
const keyword = ref("");

const paginatedMeals = computed(() => {
  const start =
    (store.state.pagination.currentPage - 1) * store.state.pagination.pageSize;
  const end = start + store.state.pagination.pageSize;
  return store.state.searchedMeals.slice(start, end);
});

const pagination = computed(() => store.state.pagination);

function searchMeals() {
  if (keyword.value) {
    store.dispatch("searchMeals", keyword.value);
  } else {
    store.commit("setSearchedMeals", []);
  }
}

function changePage(page) {
  if (
    page > 0 &&
    page <= Math.ceil(pagination.value.totalItems / pagination.value.pageSize)
  ) {
    store.commit("setCurrentPage", page);
  }
}

onMounted(() => {
  keyword.value = route.params.name || "";
  if (keyword.value) {
    searchMeals();
  }
});
</script>
