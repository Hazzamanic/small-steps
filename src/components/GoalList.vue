<template>
  <div>
    <div v-show="morningGoals.length > 0">MORNING</div>
    <v-card v-for="(goal, index) in morningGoals" :key="index">
      <v-card-title primary-title>
        <div>
          <h3 class="mb-0">{{ goal.name }}</h3>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn flat color="green">Complete</v-btn>
        <v-btn flat color="orange">Not today</v-btn>
      </v-card-actions>
    </v-card>
    <div v-show="afternoonGoals.length > 0" class="mt-2">AFTERNOON</div>
    <v-card v-for="(goal, index) in afternoonGoals" :key="index">
      <v-card-title primary-title>
        <div>
          <h3 class="mb-0">{{ goal.name }}</h3>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn flat color="green">Complete</v-btn>
        <v-btn flat color="orange">Not today</v-btn>
      </v-card-actions>
    </v-card>
    <div v-show="eveningGoals.length > 0" class="mt-2">EVENING</div>
    <v-card v-for="(goal, index) in eveningGoals" :key="index">
      <v-card-title primary-title>
        <div>
          <h3 class="mb-0">{{ goal.name }}</h3>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn flat color="green">Complete</v-btn>
        <v-btn flat color="orange">Not today</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import vue from "vue";
import store from "../State";

export default {
  name: "GoalList",
  data() {
    return {};
  },
  computed: {
    goals() {
      return store.goals;
    },
    morningGoals() {
      return this.goals.filter(g => g.when === "Morning");
    },
    afternoonGoals() {
      return this.goals.filter(g => g.when === "Afternoon");
    },
    eveningGoals() {
      return this.goals.filter(g => g.when === "Evening");
    }
  }
};
</script>