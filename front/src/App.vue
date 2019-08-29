<template>
  <div id="app">
    <div v-if="loading">Loading...</div>
    <v-annotator
      @move-end="annoChanged"
      @resize-end="annoChanged"
      :minSize="[50, 50]"
      :grid="[1, 1]"
      v-if="!loading"
    >
      <img draggable="false" :src="this.photo" />

      <rect slot="annotation" stroke="green" x="0" y="10" width="170" height="100" />
      <polygon slot="annotation" stroke="purple" x="0" y="10" width="100" height="100" />

      <rect slot="drawing" stroke="red" />
    </v-annotator>
  </div>
</template>

<script>
import VAnnotator from "vue-annotator";
import Manager from "./data_manager";
export default {
  name: "app",
  data() {
    return {
      photo: "",
      manager: null,
      ids: [],
      url: "http://localhost:5001",
      loading: false
    };
  },
  components: {
    VAnnotator
  },
  methods: {
    annoChanged(e) {
      let attr = e.node.attributes;
      console.log(attr.x, attr.y, attr.width, attr.height);
    },
    async fetchData() {
      this.loading = true;
      this.ids = await this.manager.load_id_list();
      let photo_rel_url = await this.manager.get_url(this.ids[0]);
      this.photo = `${this.url}/${photo_rel_url}`;
      this.loading = false;
    }
  },
  created() {
    this.manager = new Manager(this.url);
    this.fetchData();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
rect,
polygon {
  fill-opacity: 0;
}
</style>
