<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                :value="user.email"
                @input="updateProps({email: $event})"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
                required
                :value="user.password"
                @input="updateProps({password: $event})"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="!valid || saving"
              :loading="saving"
              @click="submit"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions } = createNamespacedHelpers("Signin");

export default {
  name: "Signin",
  created() {
    this.load();
  },
  data() {
    return {
      valid: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be greater than 6 characters"
      ]
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      saving: state => state.saving
    })
  },
  methods: {
    ...mapActions(["load", "updateProps", "save"]),
    submit() {
      if (this.$refs.form.validate()) this.save();
    }
  }
};
</script>

<style scoped>
</style>
