import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ids: [],
    annotations: {}
  },
  getters: {},
  mutations: {
    loaded_ids(state, payload) {
      let ids = payload["ids"];
      state["ids"] = ids;
    },
    loaded_annotations(state, payload) {
      let id = payload["id"];
      let annotations = payload["anno"];

      state["annotations"][id] = annotations;
      console.log(state);
    }
  },
  actions: {}
});
