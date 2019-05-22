<template>
  <v-container>
    <group-restaurant-edit-page
      v-if="dialogVisible"
      :item-id="itemId"
      :group-id="groupId"
      @close="closeDialog"
      @saved="dialogSaved"
    ></group-restaurant-edit-page>

    <div>Group Restaurants</div>
    <v-btn @click="showInsertDialog">
      <v-icon>add</v-icon>Add
    </v-btn>
    <v-list v-if="!loading && items.length">
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
    <!-- No data -->
    <div v-else-if="!loading && !items.length">There are no restaurants in this group.</div>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import GroupRestaurantEditPage from "../grouprestaurantedit/GroupRestaurantEditPage";

const { mapState, mapActions } = createNamespacedHelpers("GroupRestaurants");

export default {
  name: "GroupsRestaurantsPage",
  components: {
    GroupRestaurantEditPage
  },
  mounted() {
    this.load(this.$route.params.groupId);
  },
  computed: {
    ...mapState({
      dialogVisible: state => state.dialogVisible,
      itemId: state => state.itemId,
      items: state => state.items,
      loading: state => state.loading,
      groupId: state => state.params
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
