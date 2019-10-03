<template>
  <div id="app">
    <div class="container" v-if="!loading">
      <img
        v-for="id in $store.state.ids"
        :key="id"
        :src="$store.state.photos[id]"
        @click="image_selected(id)"
      />
    </div>
  </div>
</template>

<script>
import Manager from "../data_manager";

export default {
  name: "ImageSelector",
  data() {
    return {
      loading: true
    };
  },
  methods: {
    async fetch_photos() {
      for (let id of this.$store.state.ids) {
        if (!(id in this.$store.state.photos)) {
          let photo_url = await this.manager.get_url(id);
          this.$store.commit("loaded_photo_url", { photo: photo_url, id: id });
        }
      }

      this.loading = false;
    },
    image_selected(id) {
      this.$store.commit("select_id", id);
      this.$emit("select_id");
    }
  },
  created() {
    this.manager = new Manager(this.$store.state.url);
    this.fetch_photos();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

img {
  max-width: 350px;
  max-height: 300px;
}
</style>