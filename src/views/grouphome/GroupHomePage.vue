<template>
  <div>
    <v-container fluid>
      <v-layout>
        <h1>{{group.name}}</h1>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import GroupHomeStore from "./GroupHomeStore.js";

const { mapState, mapActions } = createNamespacedHelpers("GroupHome");

export default {
  name: "GroupHomePage",
  created() {
    this.load(this.$route.params.id);
  },
  computed: {
    ...mapState({
      group: state => state.group
    })
  },
  methods: {
    ...mapActions(["load"])
  }
};
</script>

<style>
</style>
