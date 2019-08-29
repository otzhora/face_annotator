<template>
  <div id="app">
    <Annotation />
  </div>
</template>

<script>
import Annotation from "./components/AnnotationsComponent";
export default {
  name: "App",
  components: {
    Annotation
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
