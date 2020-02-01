<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-annotator>
        <img draggable="false" :src="url" />

        <rect slot="annotation" stroke="red" x="20" y="20" width="50" height="50" />

        <rect slot="drawing" stroke="red" />
      </v-annotator>
      <v-btn @click="test_function">test somthing</v-btn>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import VAnnotator from "vue-annotator";

export default {
  name: "App",

  components: {
    VAnnotator
  },

  data: () => ({
    url: "http://localhost:5001/photos/img_1.jpg"
  }),

  methods: {
    ...mapActions(["load_id_list", "load_photo_url_by_id"]),
    async test_function() {
      await this.load_id_list();
      let id = this.$store.state.id_list[1];
      console.log(id, this.$store.state);
      await this.load_photo_url_by_id(id);
      this.url = this.$store.getters.photo_url_by_id(id);
      console.log(this.url, this.$store.state);
    }
  }
};
</script>

<style scoped>
rect,
polygon {
  fill-opacity: 0;
}
</style>