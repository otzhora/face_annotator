import Vuex from "vuex";
import Vue from "vue";
const server_port = process.env.VUE_APP_SERVER_PORT || 5000;
const server_url = process.env.VUE_APP_SERVER_URL || "http://localhost";
const url = `${server_url}:${server_port}`;
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ids: [],
    annotations: {},
    photos: {},
    url: url,
    selected_id: null
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

      state.photos[id] = `${state.url}/${photo}`;
    },
    updated_annotations(state, payload) {
      let anno = payload["anno"];
      let id = payload["id"];

      state.annotations[id] = anno;
    },
    select_id(state, id) {
      state.selected_id = id;
    }
  },
  actions: {}
});
