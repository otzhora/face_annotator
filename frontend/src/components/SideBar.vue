<template>
  <div>
    <div class="container">
      <div
        class="d-flex flex-column mb-6"
        v-for="(anno, index) in anno_for_seleted_photo"
        :key="index"
      >
        <div class="d-flex justify-md-space-between">
          <label :for="'input_name' + String(index)">name:</label>
          <input
            type="text"
            :id="'input_name' + String(index)"
            :value="anno.name"
            @change="name_change($event.target.value, index)"
          />
        </div>

        <div class="d-flex justify-md-space-between">
          <label :for="'input_x' + String(index)">x:</label>
          <input
            type="text"
            :id="'input_x' + String(index)"
            :value="Math.round(anno.x)"
            @change="x_change($event.target.value, index)"
          />
        </div>

        <div class="d-flex justify-md-space-between">
          <label :for="'input_y' + String(index)">y:</label>
          <input
            type="text"
            :id="'input_y' + String(index)"
            :value="Math.round(anno.y)"
            @change="y_change($event.target.value, index)"
          />
        </div>

        <div class="d-flex justify-md-space-between">
          <label :for="'input_width' + String(index)">width:</label>
          <input
            type="text"
            :id="'input_width' + String(index)"
            :value="Math.round(anno.width)"
            @change="width_change($event.target.value, index)"
          />
        </div>

        <div class="d-flex justify-md-space-between">
          <label :for="'input_heigth' + String(index)">heigth:</label>
          <input
            type="text"
            :id="'input_heigth' + String(index)"
            :value="Math.round(anno.height)"
            @change="heigth_change($event.target.value, index)"
          />
        </div>
        <v-btn @click="delete_anno(index)" color="rgb(95, 65, 252)">
          <div class="button_text">delete this anno</div>
        </v-btn>
      </div>
      <div class="add_new_anno">
        <v-btn @click="add_new_anno" color="rgb(95, 65, 252)">
          <div class="button_text">add new anno</div>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  computed: {
    anno_for_seleted_photo: function() {
      return this.$store.getters.anno_for_selected_photo;
    }
  },
  methods: {
    name_change(val, index) {
      let anno = this.anno_for_seleted_photo[index];
      this.$store.dispatch("update_selected_photo_anno", {
        index,
        name: val,
        x: anno.x,
        y: anno.y,
        width: anno.width,
        height: anno.height
      });
    },
    x_change(val, index) {
      console.log(val);
      let anno = this.anno_for_seleted_photo[index];
      this.$store.dispatch("update_selected_photo_anno", {
        index,
        name: anno.name,
        x: val,
        y: anno.y,
        width: anno.width,
        height: anno.height
      });
    },
    y_change(val, index) {
      let anno = this.anno_for_seleted_photo[index];
      this.$store.dispatch("update_selected_photo_anno", {
        index,
        name: anno.name,
        x: anno.x,
        y: val,
        width: anno.width,
        height: anno.height
      });
    },
    width_change(val, index) {
      let anno = this.anno_for_seleted_photo[index];
      this.$store.dispatch("update_selected_photo_anno", {
        index,
        name: anno.name,
        x: anno.x,
        y: anno.y,
        width: val,
        height: anno.height
      });
    },
    heigth_change(val, index) {
      let anno = this.anno_for_seleted_photo[index];

      this.$store.dispatch("update_selected_photo_anno", {
        index,
        name: anno.name,
        x: Number(anno.x),
        y: Number(anno.y),
        width: Number(anno.width),
        height: Number(val)
      });
    },
    add_new_anno() {
      this.$store.dispatch("update_selected_photo_anno", {
        index: this.anno_for_seleted_photo.length,
        name: "Sample name",
        x: 100,
        y: 100,
        width: 150,
        height: 150
      });
    },
    delete_anno(index) {
      this.$store.dispatch("delete_photo_anno", index);
    }
  }
};
</script>

<style scoped>
.add_new_anno {
  padding: 12px;
}

.container {
  color: #ffffff;
  background-color: rgb(34, 35, 57);
  border-radius: 20px;
}

.button_text {
  color: #ffffff;
}
</style>
