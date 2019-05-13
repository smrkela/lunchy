<template>
  <span>
    <v-navigation-drawer app v-model="drawer" class="brown lighten-2" dark disable-resize-watcher>
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-tile :key="index">
            <v-list-tile-content>{{item.title}}</v-list-tile-content>
          </v-list-tile>
          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="brown darken-4" dark>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <router-link to="/">
        <v-toolbar-title to="/">{{appTitle}}</v-toolbar-title>
      </router-link>
      <v-btn flat class="hidden-sm-and-down" to="/groups">Groups</v-btn>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn flat to="/signin">Login</v-btn>
        <v-btn color="brown lighten-3" to="/register">Register</v-btn>
      </div>
      <span v-else>
        <span>{{userTitle}}</span>
        <v-btn outline color="white" @click="logout">Logout</v-btn>
      </span>
    </v-toolbar>
  </span>
</template>

<script>
export default {
  name: "AppNavigation",
  data() {
    return {
      appTitle: "Lunchy",
      drawer: false,
      items: [{ title: "Groups" }, { title: "Login" }, { title: "Register" }]
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    userTitle() {
      return "Hi " + this.$store.state.user.firstName;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("userSignOut");
    }
  }
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>