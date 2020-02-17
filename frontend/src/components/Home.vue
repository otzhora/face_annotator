<template>
  <div class="container d-flex  align-center justify-center">
    <div>
      <div>
        <v-btn to="/host"> Хост </v-btn>
      </div>
      <div>
        <v-btn to="/annotations"> Клиент </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.container {
  max-width: 100% !important;
  color: white;
  height: 100%;
}
</style>
