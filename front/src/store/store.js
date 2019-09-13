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
      console.log(state);
    },
    loaded_photo_url(state, payload) {
      let photo = payload["photo"];
      let id = payload["id"];

      state.photos[id] = photo;
    }
  },
  actions: {}
});
