<template>
  <div>
    <div v-show="morningGoals.length > 0">MORNING</div>
    <v-card v-for="(goal, index) in morningGoals" :key="goal.id">
      <v-card-title primary-title>
        <div>
          <h3 class="mb-0">{{ goal.name }}</h3>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn @click="completeGoal(goal)" flat color="green">Complete</v-btn>
        <v-btn @click="completeGoal(goal)"  flat color="orange">Not today</v-btn>
      </v-card-actions>
    </v-card>
    <div v-show="afternoonGoals.length > 0" class="mt-2">AFTERNOON</div>
    <v-card v-for="(goal, index) in afternoonGoals" :key="goal.id">
      <v-card-title primary-title>
        <div>
          <h3 class="mb-0">{{ goal.name }}</h3>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn @click="completeGoal(goal)"  flat color="green">Complete</v-btn>
        <v-btn @click="completeGoal(goal)"  flat color="orange">Not today</v-btn>
      </v-card-actions>
    </v-card>
    <div v-show="eveningGoals.length > 0" class="mt-2">EVENING</div>
    <v-card v-for="(goal, index) in eveningGoals" :key="goal.id">
      <v-card-title primary-title>
        <div>
          <h3 class="mb-0">{{ goal.name }}</h3>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn @click="completeGoal(goal)"  flat color="green">Complete</v-btn>
        <v-btn @click="completeGoal(goal)"  flat color="orange">Not today</v-btn>
      </v-card-actions>
    </v-card>
    <div class="text-xs-center" v-show="goals.length === 0">Well done! Why not set yourself another goal?
       <br />
    <v-btn color="info" @click="addGoals">Add More</v-btn></div>
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
      return store.activeGoals;
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
  },
  methods: {
    completeGoal(goal) {
      goal.complete = true;
    },
    addGoals() {
      store.setPage('categories')
    }
  }
};
</script>