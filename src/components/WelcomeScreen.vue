<template>
  <div class="welcome-screen">
    <v-container>
      <div class="slider"></div>
      <div class="welcome-cta">
        Just one small step at a time...
        <div>
          <v-btn @click="start" color="red">Get Started</v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import store from '../State';

export default {
  name: "WelcomeScreen",
  methods: {
      start() {
          store.setPage('categories')
      }
  }
};
</script>

<style>
.welcome-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: green;
}

.slider {
  height: 60vh;
}

.welcome-cta {
  text-align: center;
}
</style>