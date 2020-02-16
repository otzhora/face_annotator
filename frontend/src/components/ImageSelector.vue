<template>
  <vue-custom-scrollbar class="scroll-area">
    <div class="container d-flex justify-md-space-between">
      <div class="image_container" v-for="(id, index) in id_list" :key="index">
        <img :src="photo_url(id)" @click="selected(id)" />
      </div>
    </div>
  </vue-custom-scrollbar>
</template>

<script>
import vueCustomScrollbar from "vue-custom-scrollbar";

export default {
  name: "ImageSelector",
  components: { vueCustomScrollbar },
  computed: {
    id_list: function() {
      return this.$store.state.id_list;
    }
  },
  methods: {
    photo_url(id) {
      return this.$store.getters.photo_url_by_id(id);
    },
    selected(id) {
      this.$store.dispatch("change_selected_id", id);
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 256px;
}

img {
  max-height: 100%;
  padding-right: 50px;
}

.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  height: 25vh;
}
</style>
