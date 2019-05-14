<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form v-model="valid" ref="form">
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="First name*"
                  :value="item.firstName"
                  @input="updateItem({firstName: $event})"
                  :rules="firstNameRules"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  label="Last name*"
                  :value="item.lastName"
                  @input="updateItem({lastName: $event})"
                  :rules="lastNameRules"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          flat
          @click="submit"
          :disabled="!valid || saving"
          :loading="saving"
        >Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import ColorUtils from "../../utils/ColorUtils.js";
import OverlayLoader from "../../components/OverlayLoader";

const { mapState, mapActions } = createNamespacedHelpers("UserProfile");

export default {
  name: "UserProfilePage",
  props: {
    itemId: String
  },
  components: { OverlayLoader },
  created() {
    this.load();
  },
  data() {
    return {
      valid: false,
      firstNameRules: [v => !!v || "First name is required"],
      lastNameRules: [v => !!v || "Last name is required"]
    };
  },
  computed: {
    ...mapState({
      item: state => state.item,
      saved: state => state.saved,
      loading: state => state.loading,
      saving: state => state.saving
    })
  },
  watch: {
    saved(newValue) {
      if (newValue) this.$emit("saved");
    }
  },
  methods: {
    ...mapActions(["load", "save", "updateItem"]),
    submit() {
      if (this.$refs.form.validate()) this.save();
    }
  }
};
</script>
