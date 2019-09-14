<template>
  <div id="app">
    <div v-if="loading">Loading...</div>
    <div class="container" v-if="!loading">
      <AnnotationWindow :id="id" v-on:annoChangedEvent="annoChanged" />
      <AnnotationSideBar :id="id" v-on:annoChangedEvent="annoChanged" />
    </div>

    <button @click="sendToServer">Send to server</button>
  </div>
</template>

<script>
import AnnotationWindow from "./AnnotationWindow";
import AnnotationSideBar from "./AnnotationSideBar";
import Manager from "../data_manager";
export default {
  name: "Annotation",
  props: ["url", "id"],
  data() {
    return {
      manager: null,
      loading: true
    };
  },
  components: {
    AnnotationWindow,
    AnnotationSideBar
  },
  methods: {
    annoChanged(e) {
      this.annotations = e;
      this.$store.commit("updated_annotations", {
        id: this.id,
        anno: this.annotations
      });
    },
    async fetchData() {
      this.loading = true;
      let photo_rel_url = await this.manager.get_url(this.id);
      this.photo = `${this.url}/${photo_rel_url}`;

      this.$store.commit("loaded_photo_url", {
        id: this.id,
        photo: this.photo
      });

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

      this.$store.commit("loaded_annotations", {
        id: this.id,
        anno: this.annotations
      });
      this.loading = false;
    },
    sendToServer() {
      let faces = [];
      for (let item of this.annotations) {
        let name = item.name;
        faces.push({
          [name]: item[name]
        });
      }
      this.$store.commit("updated_annotations", {
        id: this.id,
        anno: this.annotations
      });
      this.manager.update_faces(this.id, faces);
    }
  },
  created() {
    this.manager = new Manager(this.url);
    this.fetchData();
  }
};
</script>

<style scoped>
</style>