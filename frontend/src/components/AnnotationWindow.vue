<template>
  <div>
    <v-annotator @move-end="annoChanged" @resize-end="annoChanged">
      <img draggable="false" :src="url" />

      <div
        class="overlay"
        v-for="(item,index) in anno_for_selected_photo"
        :key="index"
        :class="{active: isHovered}"
        :style="{top: item.y+'px', left: item.x+'px'}"
      >
        <div class="text">{{item.name}}</div>
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

      <rect slot="drawing" stroke="red" />
    </v-annotator>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import VAnnotator from "vue-annotator";
export default {
  name: "AnnotationWindow",
  components: {
    VAnnotator
  },
  data: () => ({ isHovered: true }),
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
}

.active {
  opacity: 1;
  color: white;
}
</style>