<template>
  <v-container>
    <!-- Edit dialog -->
    <group-edit-page
      v-if="dialogVisible"
      :item-id="itemId"
      @close="closeDialog"
      @saved="dialogSaved"
    ></group-edit-page>

    <!-- Members dialog -->
    <group-members-page
      v-if="membersDialogVisible"
      :group="selectedGroup"
      @close="closeMembersDialog"
      @saved="membersDialogSaved"
    ></group-members-page>

    <div>Groups</div>
    <v-btn @click="showInsertDialog">
      <v-icon>add</v-icon>Add
    </v-btn>
    <v-list>
      <template v-for="group in items">
        <v-list-tile :key="group.id">
          <v-list-tile-avatar :class="`mr-2 ${group.color}`"></v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{group.name}}</v-list-tile-title>
            <v-list-tile-sub-title>by {{group.author}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple @click="showEditDialog(group.id)">
              <v-icon color="grey lighten-1">edit</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-btn icon ripple :to="`/group-restaurants/${group.id}`">
              <v-icon color="grey lighten-1">restaurant</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-action>
            <v-btn icon ripple @click="showMembersDialog(group)">
              <v-icon color="grey lighten-1">people</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import GroupEditPage from "../groupedit/GroupEditPage";
import GroupMembersPage from "../groupmembers/GroupMembersPage";

const { mapState, mapActions } = createNamespacedHelpers("Groups");

export default {
  name: "GroupsPage",
  components: {
    GroupEditPage,
    GroupMembersPage
  },
  mounted() {
    this.load();
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.dialogVisible,
      itemId: state => state.itemId,
      items: state => state.items,
      loading: state => state.loading,
      selectedGroup: state => state.selectedGroup,
      membersDialogVisible: state => state.membersDialogVisible
    })
  },
  methods: {
    ...mapActions([
      "load",
      "showInsertDialog",
      "showEditDialog",
      "closeDialog",
      "dialogSaved",
      "showMembersDialog",
      "membersDialogSaved",
      "closeMembersDialog"
    ])
  }
};
</script>

<style>
</style>
