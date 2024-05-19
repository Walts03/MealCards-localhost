<template>
  <div class="flex justify-center my-4">
    <button
      @click="changePage(pagination.currentPage - 1)"
      :disabled="pagination.currentPage === 1"
      class="mx-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
    >
      Previous
    </button>
    <button
      @click="changePage(pagination.currentPage + 1)"
      :disabled="pagination.currentPage * pageSize >= totalItems"
      class="mx-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  pageSize: Number,
  totalItems: Number,
});

const emit = defineEmits(["update:page"]);

const pagination = computed(() => ({
  currentPage: 1,
  pageSize: props.pageSize,
  totalItems: props.totalItems,
}));

function changePage(page) {
  if (
    page > 0 &&
    page <= Math.ceil(pagination.value.totalItems / pagination.value.pageSize)
  ) {
    emit("update:page", page);
  }
}
</script>
