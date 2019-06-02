<template>
  <v-dialog persistent max-width="600px" :value="true">
    <v-card>
      <v-card-title>
        <span class="headline">{{title}}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-list v-if="!loading && members.length">
            <template v-for="member in members">
              <v-list-tile :key="member.userId">
                <v-list-tile-avatar :class="`mr-2`"></v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{member.firstName + ' ' + member.lastName}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
          <!-- New member entry -->
          <v-text-field
            @input="emailInput($event)"
            :value="newMemberEmail"
            prepend-icon="alternate-icon"
            append-outer-icon="send"
            box
            clear-icon="close"
            clearable
            label="Email of a member to add"
            type="text"
            @click:append-outer="addMember()"
          ></v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close()">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions } = createNamespacedHelpers("GroupMembers");

export default {
  name: "GroupsMembersPage",
  components: {},
  props: {
    group: Object
  },
  mounted() {
    this.load(this.group);
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      members: state => state.members,
      newMemberEmail: state => state.newMemberEmail,
      title: state => `Edit members for ${state.group.name} group`
    })
  },
  methods: {
    ...mapActions([
      "load",
      "closeDialog",
      "dialogSaved",
      "emailInput",
      "addMember"
    ]),
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>
