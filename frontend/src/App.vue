<template>
  <v-app margin="0">
    <v-app-bar app color="#222339">
      <div class="d-flex align-center app_bar">
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

      <v-row class="nav_list" justify="start">
        <v-col class="sm">
          <div class="button_container">
            <v-btn to="/" class="x-large">
              <div class="nav_link">Home</div>
            </v-btn>
          </div>
        </v-col>
        <v-col>
          <div class="button_container">
            <v-btn to="/annotations" class="x-small">
              <div class="nav_link">Annotations</div>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2 app-bar-text">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content class="ma-0 content"> <router-view></router-view> </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {}
};
</script>

<style>
.content {
  background-color: rgb(18, 19, 37);
}

.app-bar-text {
  color: #ffffff;
}

.nav_list {
  display: flex;
  justify-items: space-between;
  width: 15%;
}

.button_container {
  display: flex;
  justify-content: center;
}
</style>
