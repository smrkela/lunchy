<template>
  <v-dialog persistent max-width="600px" :value="true">
    <v-container>
      <div>Group Members</div>
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
      newMemberEmail: state => state.newMemberEmail
    })
  },
  methods: {
    ...mapActions([
      "load",
      "closeDialog",
      "dialogSaved",
      "emailInput",
      "addMember"
    ])
  }
};
</script>

<style>
</style>
