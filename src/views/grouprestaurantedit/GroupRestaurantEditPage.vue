<template>
  <div>
    <overlay-loader :visible="loading" text="Loading..."></overlay-loader>

    <v-dialog persistent max-width="600px" :value="true">
      <v-card>
        <v-card-title>
          <span class="headline">{{title}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form v-model="valid" ref="form">
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Name*"
                    :value="item.name"
                    @input="updateItem({name: $event})"
                    :rules="nameRules"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    label="Description"
                    :value="item.description"
                    @input="updateItem({description: $event})"
                    hint="Describe this restaurant for cenvenience"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="closeDialog" :disabled="saving || loading">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="submit" :disabled="saving || loading">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import ColorUtils from "../../utils/ColorUtils.js";
import OverlayLoader from "../../components/OverlayLoader";

const { mapState, mapActions } = createNamespacedHelpers("GroupRestaurantEdit");

export default {
  name: "GroupRestaurantEditPage",
  props: {
    itemId: String,
    groupId: String
  },
  components: { OverlayLoader },
  created() {
    this.load({ itemId: this.itemId, groupId: this.groupId });
  },
  data() {
    return {
      valid: false,
      nameRules: [v => !!v || "Name is required"],
      colors: ColorUtils.GROUP_COLORS
    };
  },
  computed: {
    ...mapState({
      title: state => (state.isInsert ? "Add restaurant" : "Update restaurant"),
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
    },
    closeDialog() {
      this.$emit("close");
    }
  }
};
</script>
