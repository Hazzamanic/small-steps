<template>
  <div>
    <h2>Settings</h2>
    <v-dialog v-model="codeDialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="info" dark v-on="on">Add Program</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Add Program</v-card-title>
        <v-card-text>
          <v-text-field v-model="code" label="Code"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="submitCode">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-divider></v-divider>
    <div>
      <v-label>Notifications</v-label>
    </div>
    <v-btn @click="simpleNotification" color="info">Simple</v-btn>
    <v-btn @click="therapistNotification" color="info">Therapist</v-btn>

    <v-divider></v-divider>
    <v-btn @click="addMoreGoals" color="info">Add more goals</v-btn> <br />
    <v-btn @click="openMap" color="info">Find a local therapist</v-btn>
    <v-divider></v-divider>
    <v-btn @click="reset" color="red">Reset</v-btn>
  </div>
</template>

<script>
import store from "../State";

export default {
  name: "Settings",
  data() {
    return {
      codeDialog: false,
      code: ""
    };
  },
  methods: {
    reset() {
      store.goals = [];
    },
    addMoreGoals() {
        store.setPage('categories')
    },
    submitCode() {
      this.codeDialog = false;
      this.code = "";
    },
    openMap() {
        store.setPage('map')
    },
    simpleNotification() {
      this.$notification.show(
        "Hello World",
        {
          body: "This is an example!"
        },
        {}
      );
    },
    therapistNotification() {
        this.$notification.show(
            "Looking forward to our session this week",
            {
                body: "You are doing great this week, see you Tuesday 8am. Keep up the good work!"
            }, {}
        )
    }
  }
};
</script>