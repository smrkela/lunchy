<template>
  <v-container fluid>
    <v-layout>
      <h1>This is a user home page {{test}}</h1>
    </v-layout>
  </v-container>
</template>

<script>
import UserHomeStore from "./UserHomeStore.js";

export default {
  computed: {
    test: function() {
      console.log("Aloha!");
      const c = UserHomeStore;
      return "Bla";
    }
  }
};
</script>

<style>
</style>
