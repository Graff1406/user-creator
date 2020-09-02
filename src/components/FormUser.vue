<template>
  <v-form ref="form">
    <v-row no-guttars>
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model.trim="name"
          :rules="[v => !!v || $text.components.form.errors.input]"
          :label="nameLabel"
          type="text"
          filled
          required
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model.trim="email"
          :rules="[
            v => !!v || $text.components.form.errors.input,
            v => /.+@.+/.test(v) || 'E-mail must be valid',
          ]"
          :label="emailLabel"
          type="email"
          filled
          required
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model.trim="address"
          :label="addressLabel"
          type="text"
          filled
          required
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-btn
          @click="saveUser"
          :color="$text.themeColor.purple"
          :block="!windowSize.widthMoreOrEqual600px"
          :loading="loading"
          id="btn-save-user"
          dark
        >
          {{ $text.layouts.default.btns.submit }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
export default {
  name: 'FormUser',
  props: {
    updateData: Boolean,
    loading: Boolean,
    user: Object,
    nameLabel: {
      type: String,
      required: true
    },
    emailLabel: {
      type: String,
      required: true
    },
    addressLabel: {
      type: String,
      required: true
    },
    windowSize: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      name: this.user?.name || '',
      email: this.user?.email || '',
      address: this.user?.address || '',
    }
  },
  methods: {
    saveUser() {
      if (this.$refs.form.validate()) {
        // or updated or new created
        const user = this.user?.id
          ? {name: this.name, email: this.email, address: this.address, id: this.user.id}
          : {name: this.name, email: this.email, address: this.address, created_at: Date.now()};
        this.$emit("save-user", user);
        if (!this.updateData) this.$refs.form.reset();
      } else console.log("didn't pass validate");
    }
  }
}
</script>