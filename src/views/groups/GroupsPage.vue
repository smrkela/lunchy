<template>
  <v-container>
    <group-edit-page
      v-if="dialogVisible"
      :item-id="itemId"
      @close="closeDialog"
      @saved="dialogSaved"
    ></group-edit-page>

    <v-btn @click="showInsertDialog">
      <v-icon>add</v-icon>Add
    </v-btn>
    <v-list>
      <template v-for="group in items">
        <v-list-tile :key="group.id" @click="showEditDialog(group.id)">
          <v-list-tile-avatar :class="`mr-2 ${group.color}`"></v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{group.name}}</v-list-tile-title>
            <v-list-tile-sub-title>by {{group.author}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import GroupEditPage from "../groupedit/GroupEditPage";

const { mapState, mapActions } = createNamespacedHelpers("Groups");

export default {
  name: "GroupsPage",
  components: {
    GroupEditPage
  },
  mounted() {
    this.load();
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.dialogVisible,
      itemId: state => state.itemId,
      items: state => state.items,
      loading: state => state.loading
    })
  },
  methods: {
    ...mapActions([
      "load",
      "showInsertDialog",
      "showEditDialog",
      "closeDialog",
      "dialogSaved"
    ])
  }
};
</script>

<style>
</style>
