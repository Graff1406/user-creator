<template>
  <v-row no-gutters>
    <v-col class="py-0">
      <v-text-field
        v-model.trim="userName"
        :label="searchLabel"
        type="text"
        prepend-inner-icon="search"
        filled
        rounded
        dense
        required
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'SearchFormUser',
  props: {
    searchLabel: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userName: ''
    }
  },
  watch: {
    userName(value) {
      this.$emit('input', value)
    },
  }
}
</script>