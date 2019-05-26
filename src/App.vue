<template>
  <v-app id="app">
    <v-container fluid>
      <WelcomeScreen v-if="page === 'welcome'" />
      <GoalList v-if="page === 'goals'"/>
      <CategoriesList v-if="page === 'categories'"/>
      <GoalPicker v-if="page === 'picker'"/>
      <v-bottom-nav v-show="isNavVisible" :active="page" :value="true" absolute color="transparent">
        <v-btn @click="setPage('goals')" color="teal" flat value="goals">
          <span>Goals</span>
          <v-icon>home</v-icon>
        </v-btn>

        <v-btn @click="setPage('settings')" color="teal" flat value="settings">
          <span>Favorites</span>
          <v-icon>favorite</v-icon>
        </v-btn>

        <v-btn @click="setPage('journey')" color="teal" flat value="journey">
          <span>Jouney</span>
          <v-icon>pets</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-container>
  </v-app>
</template>

<script>
import store from "./State";
import GoalList from "./components/GoalList.vue";
import CategoriesList from "./components/CategoriesList.vue";
import GoalPicker from "./components/GoalPicker.vue";
import WelcomeScreen from "./components/WelcomeScreen.vue";

export default {
  name: "app",
  computed: {
    page() {
      return store.page
    },
    isNavVisible() {
      let hiddenPages = [
        "categories",
        "picker",
        "welcome"
      ]

      return !hiddenPages.includes(this.page)
    }
  },
  methods: {
    setPage(page) {
      store.setPage(page)
    }
  },
  components: {
    GoalList,
    CategoriesList,
    GoalPicker,
    WelcomeScreen
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
