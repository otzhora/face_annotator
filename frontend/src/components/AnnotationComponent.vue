<template>
  <div>
    <div class="container" v-if="!loading">
      <AnnotationWindow />
      <ImageSelector />
      <SideBar />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AnnotationWindow from "./AnnotationWindow";
import ImageSelector from "./ImageSelector";
import SideBar from "./SideBar";

export default {
  name: "AnnotationComponent",
  components: {
    AnnotationWindow,
    ImageSelector,
    SideBar
  },
  data: () => ({
    loading: true
  }),
  created() {
    this.loading = true;
    this.load_photos();
  },
  methods: {
    ...mapActions([
      "load_id_list",
      "load_photo_info_by_id",
      "change_selected_id",
      "update_selected_photo_anno"
    ]),
    async load_photos() {
      await this.load_id_list();
      for (let id of this.$store.state.id_list) {
        await this.load_photo_info_by_id(id);
      }

      let id = this.$store.state.id_list[0];
      this.change_selected_id(id);
      this.loading = false;
    }
  }
};
</script>

<style>
</style>