import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Manager from "../data_manager";

const server_port = process.env.VUE_APP_SERVER_PORT || 5000;
const server_url = process.env.VUE_APP_SERVER_URL || "http://localhost";
const url = `${server_url}:${server_port}`;

export default new Vuex.Store({
  state: {
    server_url: url,
    manager: new Manager(url),
    id_list: [],
    photo_urls: {},
    photo_annos: {}
  },
  getters: {
    photo_url_by_id: state => id => {
      return `${state.server_url}/${state.photo_urls[id]}`;
    }
  },
  mutations: {
    CHANGE_ID_LIST(state, payload) {
      state.id_list = payload.id_list;
    },
    UPDATE_PHOTO_URL_BY_ID(state, payload) {
      state.photo_urls[payload.id] = payload.photo_url;
    },
    UPDATE_PHOTO_ANNO_BY_ID(state, payload) {
      state.photo_annos[payload.id] = payload.photo_anno;
    }
  },
  actions: {
    async load_id_list({ state, commit }) {
      commit("CHANGE_ID_LIST", { id_list: await state.manager.load_id_list() });
    },
    async load_photo_url_by_id({ state, commit }, id) {
      commit("UPDATE_PHOTO_URL_BY_ID", {
        id,
        photo_url: await state.manager.get_photo_url_by_id(id)
      });
    },
    async load_photo_anno_by_id({ state, commit }, id) {
      commit("UPDATE_PHOTO_ANNO_BY_ID", {
        id,
        photo_anno: await state.manager.get_photo_anno_by_id(id)
      });
    }
  },
  modules: {}
});
