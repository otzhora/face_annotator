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
    photo_annos: {},
    selected_id: ""
  },
  getters: {
    photo_url_by_id: state => id => {
      return `${state.server_url}/${state.photo_urls[id]}`;
    },
    url_for_selected_photo: state => {
      return `${state.server_url}/${state.photo_urls[state.selected_id]}`;
    },
    anno_for_selected_photo: state => {
      if (state.selected_id == "")
        return [{ name: "", x: 0, y: 0, width: 0, heigth: 0 }];

      let anno = state.photo_annos[state.selected_id];
      let result = [];

      for (let item of anno) {
        let name = Object.keys(item)[0];
        result.push({
          name,
          x: item[name][3],
          y: item[name][0],
          width: item[name][1] - item[name][3],
          height: item[name][2] - item[name][0]
        });
      }

      return result;
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
    },
    CHANGE_SELECTED_ID(state, new_id) {
      state.selected_id = new_id;
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
        photo_anno: await state.manager.get_annotations_by_id(id)
      });
    },
    async load_photo_info_by_id({ dispatch }, id) {
      await dispatch("load_photo_url_by_id", id);
      await dispatch("load_photo_anno_by_id", id);
    },
    change_selected_id({ commit }, new_id) {
      commit("CHANGE_SELECTED_ID", new_id);
    },
    async update_selected_photo_anno({ state, dispatch }, anno) {
      let new_anno = state.photo_annos[state.selected_id];

      new_anno[Number(anno.index)] = {
        [anno.name]: [
          Number(anno.y),
          Number(anno.x) + Number(anno.width),
          Number(anno.height) + Number(anno.y),
          Number(anno.x)
        ]
      };
      console.log(new_anno);
      await state.manager.update_annotations_by_id(state.selected_id, new_anno);
      await dispatch("load_photo_anno_by_id", state.selected_id);
      console.log(state.photo_annos);
    }
  },
  modules: {}
});
