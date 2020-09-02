<template>
  <default-layout>
    <v-row no-guttars v-resize="onResize">
      <v-col cols="12" class="pa-0">
        <v-row no-guttars align="center">
          <v-col cols="3" class="pa-2 d-flex justify-start">
            <router-link 
              v-if="windowSize.widthMoreOrEqual600px"
              to="/"
            >
              {{ $text.pages.user.links.home }}
            </router-link>
            <v-btn 
              v-else 
              :color="$text.themeColor.secondary" 
              to="/" 
              class="mx-2" 
              icon
            >
              <v-icon>arrow_back_ios</v-icon>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="2" sm="2">
            <v-btn 
              @click="deleteDialog = true" 
              :color="$text.themeColor.purple"
              id="btn-delete-user"
              icon
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="2" sm="2">
            <edit-user
              @open-dialog="dialog = !dialog"
              @close-dialog="dialog = !dialog"
              :warning-edited.sync="warningEdited"
              :window-size="windowSize"
              :dialog="dialog"
            >
              <template v-slot:edit>
                <FormUser
                  @save-user="updateUser"
                  :user="user"
                  :loading="loading.edit"
                  :window-size="windowSize"
                  :name-label="$text.components.form.labels.name"
                  :email-label="$text.components.form.labels.email"
                  :address-label="$text.components.form.labels.address"
                  content-textarea
                  update-data
                />
              </template>
            </edit-user>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <h2 class="text-all-h2">{{ user.name }}</h2>
        <p class="body">{{ user.email }}</p>
        <p class="body">{{ user.address }}</p>
      </v-col>
    </v-row>
    <v-dialog
      v-model="deleteDialog"
      scrollable 
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          {{ $text.pages.user.warnings.userDeleted }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="deleteDialog = false"
            :color="$text.themeColor.secondary"
            text
          >
            {{ $text.pages.user.btns.cancel }}
          </v-btn>
          <v-btn
            @click="deleteUser"
            :loading="loading.delete"
            :color="$text.themeColor.purple"
            text
          >
            {{ $text.pages.user.btns.delete }}
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.value" color="success" shaped>
      {{ snackbar.text }}
    </v-snackbar>
  </default-layout>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import windowSize from "../mixins/windowSize";
import DefaultLayout from "../layouts/Default";
import FormUser from "../components/FormUser";
import EditUser from "../components/EditUser";
import { MUTATION_STORE } from '../store/types/mutations';
import { UPDATE_USER, DELETE_USER } from '../store/types/actions';
export default {
  name: 'UserPage',
  components: {
    DefaultLayout,
    FormUser,
    EditUser,
  },
  mixins: [windowSize],
  data() {
    return {
      loading: {
        edit: false,
        delete: false,
      },
      snackbar: {
        value: false,
        text: '',
      },
      dialog: false,
      deleteDialog: false,
      warningEdited: false,
    }
  },
  computed: {
    user() {
      // find user by passed id
      return this.$store.state.users.length
        ? this.$store.state.users.find(user => user.id == this.$route.params.id)
        : {};
    },
  },
  methods: {
    async updateUser({name, email, address, id}) {
      this.loading.edit = true;
      await this[UPDATE_USER]({name, email, address, id});
      this.dialog = this.loading.edit = false;
      // show notification about new user updated
      this.snackbar.text = this.$text.pages.user.warnings.userUpdated;
      this.snackbar.value = true;
    },
    async deleteUser() {
      this.loading.delete = true;
      await this[DELETE_USER](this.user.id);
      this.loading.delete = false;
      this.$router.push({path: '/', query: { user_deleted: 1 }});
    },
    ...mapMutations([MUTATION_STORE]),
    ...mapActions([UPDATE_USER, DELETE_USER])
  }
}
</script>
