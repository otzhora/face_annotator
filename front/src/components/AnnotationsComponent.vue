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
      />

      <rect slot="drawing" stroke="red" />
    </v-annotator>
  </div>
</template>

<script>
import VAnnotator from "vue-annotator";
import Manager from "../data_manager";
export default {
  name: "Annotation",
  props: ["url", "id"],
  data() {
    return {
      photo: "",
      annotations: [],
      manager: null,
      loading: false,
      isHovered: false
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
    },
    async fetchData() {
      this.loading = true;
      let photo_rel_url = await this.manager.get_url(this.id);
      this.photo = `${this.url}/${photo_rel_url}`;

      this.annotations = await this.manager.get_faces(this.id); // TODO: make get_url and get_faces requests at the same time
      for (let item of this.annotations) {
        let name = Object.keys(item)[0];
        let anno = item[name];
        item.name = name;
        item.x = anno[3];
        item.y = anno[0];
        item.width = anno[1] - anno[3];
        item.height = anno[2] - anno[0];
      }

      this.loading = false;
    }
  },
  created() {
    this.manager = new Manager(this.url);
    this.fetchData();
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