<template>
  <div id="app">
    <v-annotator
      @move-end="annoChanged"
      @resize-end="annoChanged"
      :minSize="[50, 50]"
      :grid="[1, 1]"
    >
      <img draggable="false" src="./assets/logo.png">

      <rect slot="annotation" stroke="green" x="0" y="10" width="170" height="100"/>
      <polygon slot="annotation" stroke="purple" x="0" y="10" width="100" height="100"/>

      <rect slot="drawing" stroke="red"/>
    </v-annotator>
  </div>
</template>

<script>
import VAnnotator from "vue-annotator";

export default {
  name: "app",
  components: {
    VAnnotator
  },
  methods: {
    annoChanged(e) {
      let attr = e.node.attributes;
      console.log(attr.x, attr.y, attr.width, attr.height);
    }
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
