<template>
  <div id="app">
    <div class="item_container">
      <div class="container" v-for="(item, index) in annotations" :key="index">
        <div class="input_container">
          <div class="name">name:</div>
          <input type="text" v-model="item['name']" v-on:input="inputTiggered" />
        </div>

        <div class="input_container">
          <div class="coord">x:</div>
          <input type="text" v-model="item['x']" v-on:input="inputTiggered" />
        </div>
        <div class="input_container">
          <div class="coord">y:</div>
          <input type="text" v-model="item['y']" v-on:input="inputTiggered" />
        </div>
        <div class="input_container">
          <div class="coord">height:</div>
          <input type="text" v-model="item['height']" v-on:input="inputTiggered" />
        </div>
        <div class="input_container">
          <div class="coord">width:</div>
          <input type="text" v-model="item['width']" v-on:input="inputTiggered" />
        </div>
      </div>

      <div class="new_annotation_container">
        <button @click="addNewAnno">add new anno</button>
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
    },
    addNewAnno() {
      this.annotations.push({
        name: "new name",
        "new name": [100, 150, 100, 150],
        x: 100,
        y: 100,
        width: 50,
        height: 50
      });
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
.item_container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.container {
  width: 100%;
  height: 70%;
  max-height: 9rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.input_container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: space-between;
}
</style>