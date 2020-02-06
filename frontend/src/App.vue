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
      <div class="container" v-if="!loading">
        <v-annotator @move-end="annoChanged" @resize-end="annoChanged">
          <img draggable="false" :src="url" />

          <rect
            slot="annotation"
            stroke="red"
            v-for="(item, index) in anno_for_selected_photo"
            :key="index"
            :x="item.x"
            :y="item.y"
            :width="item.width"
            :height="item.heigth"
            :name="item.name"
            :index="index"
          />

          <rect slot="drawing" stroke="red" />
        </v-annotator>
      </div>
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
    loading: true
  }),

  methods: {
    ...mapActions([
      "load_id_list",
      "load_photo_url_by_id",
      "load_photo_anno_by_id",
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
    },
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
  },

  computed: {
    anno_for_selected_photo: {
      get: function() {
        return this.$store.getters.anno_for_selected_photo;
      },
      set: function() {
        return;
      }
    },
    url: function() {
      return this.$store.getters.url_for_selected_photo;
    }
  },
  created() {
    this.loading = true;
    this.load_photos();
  }
};
</script>

<style scoped>
rect,
polygon {
  fill-opacity: 0;
}
</style>