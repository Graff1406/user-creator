<template>
  <default-layout>
    <v-row no-guttars v-resize="onResize">
      <v-col cols="12">
        <v-row no-guttars align="center">
          <v-col cols="4">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="4">
            <h2 class="text-all-h2">{{ $text.pages.home.titles.create }}</h2>
          </v-col>
          <v-col cols="4">
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <FormUser
          @save-user="createUser"
          :loading="spinner"
          :windowSize="windowSize"
          :name-label="$text.components.form.labels.name"
          :email-label="$text.components.form.labels.email"
          :address-label="$text.components.form.labels.address"
        />
      </v-col>
      <v-col cols="12">
        <v-row no-guttars align="center">
          <v-col cols="4">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="4">
            <h2 class="text-all-h2">{{ $text.pages.home.titles.users }}</h2>
          </v-col>
          <v-col cols="4">
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <SearchUser 
          v-model="userName" 
          :search-label="$text.components.searchUser.labels.search" 
        />
        <ListUsers :users="users" :windowSize="windowSize" />
      </v-col>
      <v-col v-if="!users.length" cols="12">
        <v-row no-guttars justify="center">
          <v-alert :value="true" type="info" prominent text>
            {{ $text.alerts.notFound }}
          </v-alert>
        </v-row>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.value" color="success" shaped top>
      {{ snackbar.text }}
    </v-snackbar>
  </default-layout>
</template>

<script>
import { mapActions } from "vuex";
import ListUsers from "../components/ListUsers";
import windowSize from "../mixins/windowSize";
import DefaultLayout from "../layouts/Default";
import FormUser from "../components/FormUser";
import SearchUser from '../components/SearchUser';
import { GET_USERS, CREATE_NEW_USER, DELETE_USER } from '../store/types/actions';
export default {
  name: 'HomePage',
  components: {
    ListUsers,
    DefaultLayout,
    FormUser,
    SearchUser
  },
  mixins: [windowSize],
  data() {
    return {
      spinner: false,
      userName: '',
      snackbar: {
        value: false,
        text: '',
      },
    }
  },
  computed: {
    users() {
      // find user with selected name or show all users
      return this.userName
        ? this.$store.state.users.filter(({name}) => 
            name.toLowerCase().indexOf(this.userName.toLowerCase()) + 1
          )
        : this.$store.state.users;
    },
  },
  watch: {
    snackbar: {
      deep: true,
      handler({value}) {
        // clear the query string and notification text after showing the delete user notification
        if (!value && this.$route.query.user_deleted) 
          this.$router.replace({path: '/', query: {}});
        else if (!value) this.snackbar.text = '';
      }
    }
  },
  async mounted() {
    if (!this.users.length) await this[GET_USERS]();
    // after a redirect from the user's page, show a notification of deletion
    if (this.$route.query.user_deleted) {
      this.snackbar.text = this.$text.pages.home.warnings.userDeleted;
      this.snackbar.value = true;
    }
  },
  methods: {
    async createUser(user) {
      this.spinner = !this.spinner;
      await this[CREATE_NEW_USER](user);
      this.spinner = !this.spinner;
      // show notification about new user creation
      this.snackbar.text = this.$text.pages.home.warnings.userCreated;
      this.snackbar.value = true;
    },
    ...mapActions([GET_USERS, CREATE_NEW_USER])
  }
}
</script>
