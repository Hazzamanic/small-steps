<template>
  <div>
      <h1 class="text-xs-center">Categories</h1>
    <v-checkbox
      v-for="(category, index) in categories"
      :key="index"
      v-model="selected"
      :label=category.CategoryName
      :value=category.CategoryId
      hide-details
    ></v-checkbox>
    <v-btn block class="mt-4" color="success" @click="submitCategories">Continue</v-btn>
  </div>
</template>

<script>
import vue from "vue";
import store from "../State";

export default {
  name: "CategoriesList",
  data() {
    return {
        selected: []
    };
  },
  computed: {
    categories() {
      return store.db.Categories;
    }
  },
  methods: {
      submitCategories() {
          store.setSelectedCategories(this.selected)
          store.setPage('picker')
      }
  }
};
</script>