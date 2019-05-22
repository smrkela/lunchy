import httpService from "../services/HttpService";
import FirebaseUtils from "../utils/FirebaseUtils";

const commonState = additionalStateProps => {
    return {
        items: [],
        loading: false,
        dialogVisible: false,
        dialogEditing: false,
        dialogLoading: false,
        itemId: null,
        params: {},
        ...(additionalStateProps || {})
    };
};

const commonMutationNames = {
    LOAD_PENDING: "loadPending",
    LOAD_COMPLETE: "loadComplete",
    SHOW_INSERT_DIALOG: "showInsertDialog",
    SHOW_EDIT_DIALOG: "showEditDialog",
    CLOSE_DIALOG: "closeDialog"
};

const commonMutations = {
    [commonMutationNames.LOAD_PENDING](state, payload) {
        state.items = [];
        state.loading = true;
        state.params = payload;
    },
    [commonMutationNames.LOAD_COMPLETE](state, payload) {
        state.items = payload;
        state.loading = false;
    },
    [commonMutationNames.SHOW_INSERT_DIALOG](state) {
        state.itemId = null;
        state.dialogEditing = false;
        state.dialogVisible = true;
    },
    [commonMutationNames.SHOW_EDIT_DIALOG](state, itemId) {
        state.itemId = itemId;
        state.dialogEditing = true;
        state.dialogVisible = true;
    },
    [commonMutationNames.CLOSE_DIALOG](state) {
        state.dialogVisible = false;
    }
};

const commonActions = {
    load(resourceUrlOrFactory, paramFactory) {
        return async ({ commit, state, rootState }, payload) => {

            commit(commonMutationNames.LOAD_PENDING, payload);

            const url = typeof resourceUrlOrFactory === "string" ? resourceUrlOrFactory : resourceUrlOrFactory(state, payload, rootState);

            const data = await httpService.get(url, paramFactory ? paramFactory(state, payload, rootState) : null);
            commit(commonMutationNames.LOAD_COMPLETE, FirebaseUtils.toArray(data.data))
        }
    },
    showInsertDialog({ commit }) {
        commit(commonMutationNames.SHOW_INSERT_DIALOG);
    },
    closeDialog({ commit }) {
        commit(commonMutationNames.CLOSE_DIALOG);
    },
    showEditDialog({ commit }, itemId) {
        commit(commonMutationNames.SHOW_EDIT_DIALOG, itemId);
    },
    dialogSaved({ commit, dispatch }) {
        dispatch("closeDialog");
        dispatch("load");
    }
}

export default {
    state: commonState,
    mutations: commonMutations,
    actions: commonActions
};