<template>
  <div id="app">
    <v-annotator
      @move-end="annoChanged"
      @resize-end="annoChanged"
      :minSize="[50, 50]"
      :grid="[1, 1]"
    >
      <img
        draggable="false"
        :src="this.photo"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
      />
      <div
        class="overlay"
        v-for="(item,index) in annotations"
        :key="index"
        :class="{active: isHovered}"
        :style="{top: item.y+'px', left: item.x+'px'}"
      >
        <div class="text">{{item.name}}</div>
      </div>

      <rect
        v-for="(item,index) in annotations"
        :key="index"
        slot="annotation"
        stroke="red"
        :x="item.x"
        :y="item.y"
        :width="item.width"
        :height="item.height"
        :index="index"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
        @mousedown="isHovered = false"
        @mouseup="isHovered = true"
      />

      <rect slot="drawing" stroke="red" />
    </v-annotator>
  </div>
</template>

<script>
import VAnnotator from "vue-annotator";
export default {
  name: "AnnotationWindow",
  props: ["id"],
  data() {
    return {
      isHovered: false,
      annotations: null,
      photo: null
    };
  },
  components: {
    VAnnotator
  },
  methods: {
    annoChanged(e) {
      let attr = e.node.attributes;
      let idx = Number(attr.index.value);
      let anno = [
        Number(attr.y.value),
        Number(attr.x.value) + Number(attr.width.value),
        Number(attr.y.value) + Number(attr.height.value),
        Number(attr.x.value)
      ];
      let name = this.annotations[idx].name;
      this.annotations[idx][name] = anno;

      this.annotations[idx].x = Number(attr.x.value);
      this.annotations[idx].y = Number(attr.y.value);
      this.annotations[idx].height = Number(attr.height.value);
      this.annotations[idx].width = Number(attr.width.value);
      this.$emit("annoChangedEvent", this.annotations);
    }
  },
  created() {
    this.photo = this.$store.state.photos[this.id];
    this.annotations = this.$store.state.annotations[this.id];
  }
};
</script>

<style scoped>
rect,
polygon {
  fill-opacity: 0;
}

.overlay {
  z-index: 100;
  position: absolute;
  opacity: 0;
}

.active {
  opacity: 1;
  color: white;
}
</style>