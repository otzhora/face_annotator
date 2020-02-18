<template>
  <div class="container">
    <vue-custom-scrollbar class="scroll-area">
      <v-annotator
        :height="img_height"
        :width="img_width"
        @move-end="annoChanged"
        @resize-end="annoChanged"
      >
        <img @load="test" draggable="false" :src="url" />

        <div
          class="overlay"
          v-for="(item, index) in anno_for_selected_photo"
          :key="index"
          :class="{ active: isHovered }"
          :style="{ top: item.y + 'px', left: item.x + 'px' }"
        >
          <div class="text">{{ item.name }}</div>
        </div>

        <rect
          slot="annotation"
          stroke="red"
          v-for="(item, index) in anno_for_selected_photo"
          :key="index"
          :x="item.x"
          :y="item.y"
          :width="item.width"
          :height="item.height"
          :name="item.name"
          :index="index"
          @mousedown="isHovered = false"
          @mouseup="isHovered = true"
        />

        <rect slot="drawing" stroke="yellow" />
      </v-annotator>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import VAnnotator from "vue-annotator";
import vueCustomScrollbar from "vue-custom-scrollbar";

export default {
  name: "AnnotationWindow",
  components: {
    VAnnotator,
    vueCustomScrollbar
  },
  data: () => ({ isHovered: true, img_height: 600, img_width: 600 }),
  computed: {
    anno_for_selected_photo: {
      get: function() {
        return this.$store.getters.anno_for_selected_photo;
      }
    },
    url: function() {
      return this.$store.getters.url_for_selected_photo;
    }
  },
  methods: {
    ...mapActions(["update_selected_photo_anno"]),
    annoChanged(e) {
      let attr = e.node.attributes;
      this.update_selected_photo_anno({
        x: attr.x.value,
        y: attr.y.value,
        width: attr.width.value,
        height: attr.height.value,
        name: attr.name.value,
        index: attr.index.value
      });
    },
    test(e) {
      this.img_height = e.target.height;
      this.img_width = e.target.width;
    }
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
  font-size: 20px;
}

.active {
  opacity: 1;
  color: white;
}

.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  height: 65vh;
  padding: 0px;
}

.container {
  background-color: rgb(28, 30, 45);
  height: 100%;
  display: flex;
  padding: 0px;
}
</style>
