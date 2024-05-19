// actions.js
import axiosClient from "../axiosClient";
export default {
  async searchMeals({ commit }, keyword) {
    if (!keyword) return; // Prevent empty queries
    try {
      const { data } = await axiosClient.get(`search.php?s=${keyword}`);
      commit("setSearchedMeals", data.meals);
      commit("setTotalItems", data.meals.length); // Assuming all meals are loaded for client-side pagination
    } catch (error) {
      console.error("Error fetching meals:", error);
      commit("setSearchedMeals", []); // Clear meals on error
      commit("setTotalItems", 0);
    }
  },
  async searchMealsByLetter({ commit }, letter) {
    const { data } = await axiosClient.get(`search.php?f=${letter}`);
    commit("setMealsByLetter", data.meals);
  },
  async searchMealsByIngredient({ commit }, ing) {
    const { data } = await axiosClient.get(`filter.php?i=${ing}`);
    commit("setMealsByIngredient", data.meals);
  },
};
