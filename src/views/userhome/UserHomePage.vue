<template>
  <div>
    <v-container fluid>
      <v-layout>
        <h1>This is a user home page</h1>
      </v-layout>
    </v-container>
    <v-card v-if="!isLoading && groups && groups.length">
      <v-container fluid grid-list-lg>
        <v-layout row wrap v-for="group in groups" :key="group.id">
          <v-flex xs12>
            <v-card :color="`${group.color} darken-2`" class="white--text">
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{group.name}}</div>
                  <span>{{group.description}}</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark :to="`group/${group.id}`">Listen now</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <div v-else-if="!isLoading && groups && !groups.length">You are not a member of any group yet.</div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import UserHomeStore from "./UserHomeStore.js";

const { mapState, mapActions } = createNamespacedHelpers("UserHome");

export default {
  name: "UserHomePage",
  created() {
    this.load();
  },
  computed: {
    ...mapState({
      groups: state => state.groups,
      isLoading: state => state.isLoading
    })
  },
  methods: {
    ...mapActions(["load"])
  }
};
</script>

<style>
</style>
