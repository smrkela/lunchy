import httpService from "../services/HttpService";

const commonState = additionalStateProps => {
    return {
        itemId: null,
        item: {},
        loading: false,
        saving: false,
        isInsert: false,
        saved: false,
        ...(additionalStateProps || {})
    };
};

const commonMutationNames = {
    LOAD_PENDING: "loadPending",
    LOAD_COMPLETE: "loadComplete",
    SAVE_PENDING: "savePending",
    SAVE_COMPLETE: "saveComplete",
    UPDATE_ITEM: "updateItem"
};

const commonMutations = {
    [commonMutationNames.LOAD_PENDING](state, itemId) {
        state.isInsert = !itemId;
        state.itemId = itemId;
        state.item = {};
        state.loading = true;
        state.saved = false;
    },
    [commonMutationNames.LOAD_COMPLETE](state, payload) {
        state.item = payload;
        state.loading = false;
    },
    [commonMutationNames.SAVE_PENDING](state) {
        state.saving = true;
    },
    [commonMutationNames.SAVE_COMPLETE](state, item) {
        state.saving = false;
        state.saved = true;
    },
    [commonMutationNames.UPDATE_ITEM](state, updatedProps) {
        state.item = Object.assign(state.item, updatedProps);
    }
};

const commonActionNames = {
    LOAD: "load",
    SAVE: "save",
    UPDATE_ITEM: "updateItem"
};

const commonActions = {
    load(resourceUrl, newResourceFactory) {
        return async ({ commit, state, rootState }, itemId) => {

            commit(commonMutationNames.LOAD_PENDING, itemId);

            if (itemId) {
                const response = await httpService.get(resourceUrl + "/" + itemId);
                commit(commonMutationNames.LOAD_COMPLETE, response.data);
            } else {
                commit(commonMutationNames.LOAD_COMPLETE, newResourceFactory(state, rootState));
            }
        }
    },
    save(resourceUrl, newResourceFactory, updatedResourceFactory) {
        return async ({ commit, state, rootState }) => {
            commit(commonMutationNames.SAVE_PENDING);

            let response;

            if (state.isInsert) {
                const item = newResourceFactory(state, rootState);
                response = await httpService.post(resourceUrl, item);
            }
            else {
                const item = updatedResourceFactory(state, rootState);
                response = await httpService.put(resourceUrl + "/" + state.itemId, item);
            }

            commit(commonMutationNames.SAVE_COMPLETE, response.data);
        }
    },
    updateItem({ commit }, updatedProps) {
        commit(commonMutationNames.UPDATE_ITEM, updatedProps);
    }
}

export default {
    state: commonState,
    mutations: commonMutations,
    actions: commonActions
};