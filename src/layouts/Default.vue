<template>
  <div>
    <v-app-bar app dark :color="$text.themeColor.purple">
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          ></v-img
        ></v-avatar>
      </v-btn>
      <v-toolbar-title>{{ $text.appTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-progress-linear 
        :active="$store.state.loading"
        :indeterminate="$store.state.loading"
        fixed
        color="purple darken-1"></v-progress-linear>
      <v-container class="fill-height" fluid>
          <v-row justify="center">
            <v-col cols="12" sm="6">
              <slot />
            </v-col>
          </v-row>
      </v-container>
    </v-main>
  </div>
</template>
<script>
export default {
  name: "Home",
}
</script>
