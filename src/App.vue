<template>
  <v-app id="app">
      <Map v-if="page === 'map'" />
      <WelcomeScreen v-if="page === 'welcome'" />
    <v-container fluid>
      <GoalList v-if="page === 'goals'"/>
      <CategoriesList v-if="page === 'categories'"/>
      <GoalPicker v-if="page === 'picker'"/>
      <Settings v-if="page === 'settings'" />
      <Journey v-if="page === 'journey'" />
      
    </v-container>
      <v-bottom-nav v-show="isNavVisible" :active="page" :value="true" fixed color="white">
        <v-btn @click="setPage('goals')" color="teal" flat value="goals">
          <span>Goals</span>
          <v-icon>home</v-icon>
        </v-btn>

        <v-btn @click="setPage('settings')" color="teal" flat value="settings">
          <span>Settings</span>
          <v-icon>settings</v-icon>
        </v-btn>

        <v-btn @click="setPage('journey')" color="teal" flat value="journey">
          <span>Jouney</span>
          <v-icon>pets</v-icon>
        </v-btn>
      </v-bottom-nav>
  </v-app>
</template>

<script>
import store from "./State";
import GoalList from "./components/GoalList.vue";
import CategoriesList from "./components/CategoriesList.vue";
import GoalPicker from "./components/GoalPicker.vue";
import WelcomeScreen from "./components/WelcomeScreen.vue";
import Settings from "./components/Settings";
import Journey from "./components/Journey";
import Map from "./components/Map";

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
    WelcomeScreen,
    Settings,
    Journey,
    Map
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
