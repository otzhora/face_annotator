<template>
  <div id="app">
    <header>
      <img src="./assets/microbo_annotator.png" alt="logo">
    </header>
    <anno v-if="!loading && $store.state.selected_id" />

    <ImageSelector v-if="!loading" @select_id="sel_id" />
  </div>
</template>

<script>
import Annotation from "./components/AnnotationsComponent";
import Manager from "./data_manager";
import ImageSelector from "./components/ImageSelector";
export default {
  name: "App",
  data() {
    return {
      manager: null,
      ids: [],
      loading: false
    };
  },
  components: {
    anno: Annotation,
    ImageSelector
  },
  methods: {
    fetchData: async function() {
      this.ids = await this.manager.load_id_list();
      this.$store.commit("loaded_ids", { ids: this.ids });
      this.$store.commit("select_id", this.ids[0]);
      this.loading = false;
    },
    sel_id() {
      this.$children[0].sel_id();
    }
  },
  created() {
    this.manager = new Manager(this.$store.state.url);
    this.loading = true;
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
}
header{
  width: 100%;
  background: black;
  height: 40px;
  text-align: left;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  padding: 3px;
}
.svg_select_points {
  display: none;
}
.background {
  display: flex;
}
</style>
