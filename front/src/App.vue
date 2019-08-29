<template>
  <div id="app">
    <div v-for="(item, idx) in ids" :key="idx">
      <Annotation :url="url" :id="item" v-if="!loading" />
    </div>
  </div>
</template>

<script>
import Annotation from "./components/AnnotationsComponent";
import Manager from "./data_manager";
export default {
  name: "App",
  data() {
    return {
      manager: null,
      ids: [],
      url: "http://localhost:5001",
      loading: false
    };
  },
  components: {
    Annotation
  },
  methods: {
    fetchData: async function() {
      this.ids = await this.manager.load_id_list();
      this.loading = false;
    }
  },
  created() {
    this.manager = new Manager(this.url);
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
  margin-top: 60px;
}
</style>
