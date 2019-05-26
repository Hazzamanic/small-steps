<template>
  <div>
    <h2>Settings</h2>
    <v-dialog v-model="codeDialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="info" dark v-on="on">Click Me</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title>

        <v-text-field v-model="code"></v-text-field>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="submitCode">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-divider></v-divider>
    <v-label>Notifications</v-label>
    <v-btn @click="simpleNotification" color="info">Simple</v-btn>
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
    submitCode() {
      this.codeDialog = false;
      this.code = "";
    },
    simpleNotification() {
      this.$notification.show(
        "Hello World",
        {
          body: "This is an example!"
        },
        {}
      );
    }
  }
};
</script>