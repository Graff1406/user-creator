<template>
  <default-layout>
    <v-row no-guttars>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            {{ $text.pages.notFound.title }}
            <router-link to="/">{{ $text.pages.notFound.linkText }}</router-link>
            <v-col>
              <h1>{{ $text.pages.notFound.text }}</h1>
              <p>{{ $text.pages.notFound.subtext }}</p>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </default-layout>
</template>
<script>
import DefaultLayout from '../layouts/Default'
  export default {
    name: 'NotFoundPage',
    components: {
      DefaultLayout
    }
  }
</script>
