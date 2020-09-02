<template>
  <v-row no-gutters>
    <v-col
      v-for="{name, email, address, id} in users"
      :key="`image-${id}`"
      cols="12"
      class="py-2"
    >
      <v-hover
        v-slot:default="{ hover }"
        open-delay="200"
      >
        <v-card 
          link :to="`/${id}`" 
          :elevation="hover ? 2 : 0" 
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>
                {{ name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ email }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ address }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ListUsers',
  props: {
    users: {
      type: Array,
      default(users) {
        return users || []
      }
    },
    windowSize: {
      type: Object,
      required: true
    },
  },
}
</script>
