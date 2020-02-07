<template>
  <div>
    <div class="container">
      <div class="image_container" v-for="(id, index) in id_list" :key="index">
        <img :src="photo_url(id)" @click="selected(id)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageSelector",
  computed: {
    id_list: function() {
      return this.$store.state.id_list;
    }
  },
  methods: {
    photo_url(id) {
      console.log(id);
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
  display: flex;
  max-width: 100%;
  height: 256px;
}

img {
  max-height: 100%;
}
</style>