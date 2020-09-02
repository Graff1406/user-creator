<template>
  <div>
    <v-row justify="end" class="mx-1">
      <v-btn
        @click="$emit('open-dialog')"
        :color="$text.themeColor.purple"
        dark
        icon
      >
        <v-icon>edit</v-icon>
      </v-btn>
    </v-row>
    <v-dialog
      v-model="dialog"
      :fullscreen="!windowSize.widthMoreOrEqual600px"
      persistent
      max-width="500px"
      :transition="
        !windowSize.widthMoreOrEqual600px
          ? 'dialog-bottom-transition'
          : 'dialog-transition'
      "
    >
      <v-card>
        <v-toolbar :color="$text.themeColor.purple" dark>
          {{ $text.components.edit.title }}
          <v-spacer></v-spacer>
          <v-btn
            @click="$emit('close-dialog')"
            outlined
          >
            {{ $text.components.edit.btns.close }}
          </v-btn>
        </v-toolbar>
        <v-col cols="12">
          <slot name="edit"></slot>
        </v-col>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'EditUser',
  props: {
    dialog: Boolean,
    warningEdited: Boolean,
    windowSize: {
      type: Object,
      required: true
    },
  }
}
</script>