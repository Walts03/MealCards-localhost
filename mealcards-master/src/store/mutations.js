// mutations.js
export default {
  setSearchedMeals(state, meals) {
    state.searchedMeals = meals || [];
  },
  setMealsByLetter(state, meals) {
    state.mealsByLetter = meals || [];
  },
  setMealsByIngredient(state, meals) {
    state.mealsByIngredient = meals || [];
  },
  setCurrentPage(state, page) {
    state.pagination.currentPage = page;
  },
  setTotalItems(state, totalItems) {
    state.pagination.totalItems = totalItems;
  },
};
