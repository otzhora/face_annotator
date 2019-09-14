import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ids: [],
    annotations: {},
    photos: {}
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
    },
    loaded_photo_url(state, payload) {
      let photo = payload["photo"];
      let id = payload["id"];

      state.photos[id] = photo;
    },
    updated_annotations(state, payload) {
      let anno = payload["anno"];
      let id = payload["id"];

      state.annotations[id] = anno;
    }
  },
  actions: {}
});
