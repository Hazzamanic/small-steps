<template>
  <div class="welcome-screen">
    <div class="container">
      <div class="slider">
        
      </div>
      <div class="welcome-cta">
        <h1 class="text-xs-center">Small Steps</h1>
        <div class="button-cont pt-5">
          <v-btn @click="start" light color="rgb(54, 132, 135)" style="color: white">Get Started</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../State";

export default {
  name: "WelcomeScreen",
  methods: {
    start() {
      store.setPage("categories");
    }
  }
};
</script>

<style>
.welcome-screen {
  height: 100vh;
  background-color: #3b9b9e;
  color: white;
  position: absolute;
  left: 0;
  top: 0;
}
.welcome-cta {
  padding-top: 20px;
  text-align: center;
}

.welcome-screen .container {
  max-width: 100vw;
  margin: 0;
  padding: 0;
}

.welcome-screen button.v-btn.theme--light.red {
  margin-top: 30px;
}

.welcome-screen h1.text-xs-center {
  padding-top: 15vh;
  font-size: 5em;
  color: white;
}

.container {
  padding: 0;
  margin: 0;
}
</style>