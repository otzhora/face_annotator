<template>
  <div id="app">
    <div class="container" v-for="(item, index) in annotations" :key="index">
      <div class="name_input">
        <div class="name">name:</div>
        <input type="text" v-model="item['name']" v-on:input="inputTiggered" />
      </div>

      <div class="coord_input_container">
        <div class="coord_input">
          <div class="coord">x:</div>
          <input type="text" v-model="item['x']" v-on:input="inputTiggered" />
        </div>
        <div class="coord_input">
          <div class="coord">y:</div>
          <input type="text" v-model="item['y']" v-on:input="inputTiggered" />
        </div>
        <div class="coord_input">
          <div class="coord">height:</div>
          <input type="text" v-model="item['height']" v-on:input="inputTiggered" />
        </div>
        <div class="coord_input">
          <div class="coord">width:</div>
          <input type="text" v-model="item['width']" v-on:input="inputTiggered" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnnotationSideBar",
  props: ["id"],
  data() {
    return {
      annotations: [],
      names: []
    };
  },
  methods: {
    inputTiggered() {
      this.updPoints();
    },
    updPoints() {
      for (let i = 0; i < this.annotations.length; i++) {
        let name = this.annotations[i].name;
        let old_name = this.names[i];

        this.annotations[i][name] = [];
        this.annotations[i][name].push(this.annotations[i].y - 0);
        this.annotations[i][name].push(
          this.annotations[i].x - 0 + (this.annotations[i].width - 0)
        );
        this.annotations[i][name].push(
          this.annotations[i].y - 0 + (this.annotations[i].height - 0)
        );
        this.annotations[i][name].push(this.annotations[i].x - 0);
        if (name != old_name) {
          delete this.annotations[i][this.names[i]];
          this.names[i] = this.annotations[i].name;
        }
      }
      this.$emit("annoChangedEvent", this.annotations);
    }
  },
  created() {
    this.annotations = this.$store.state["annotations"][this.id];
    for (let i = 0; i < this.annotations.length; i++) {
      this.names.push(this.annotations[i].name);
    }
  }
};
</script>

<style scoped>
</style>