import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { USERS } from './uriList';
import { MUTATION_STORE } from './types/mutations';
import { 
  GET_USERS, 
  CREATE_NEW_USER, 
  UPDATE_USER, 
  DELETE_USER
} from './types/actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: [],
    loading: false
  },
  mutations: {
    [MUTATION_STORE] (state, {prop, data}) {
      state[prop] = data;
    }
  },
  actions: {
    async [GET_USERS] ({ commit }) {
      try {
        commit(MUTATION_STORE, { prop: "loading", data: true });
        const { data } = await query('get', [`${USERS}/.json`]);
        commit(MUTATION_STORE, { prop: 'loading', data: false });
        
        let users = [];
        if (data)
          users = Object.keys(data).map(key => {
            return { ...data[key], id: key };
          });
        commit(MUTATION_STORE, {
          prop: "users",
          data: users.sort((a, b) => b.created_at - a.created_at)
        });
      } catch (error) {
        console.log("store -> GET_USERS", error);
        throw new Error(error);
      }
    },
    async [CREATE_NEW_USER] ({ commit, state }, user) {
      const {data:{name: id}} = await query('post', [`${USERS}.json`, user])
      commit(MUTATION_STORE, {prop: 'users', data: [{id, ...user}, ...state.users]});
    },
    async [UPDATE_USER] ({ commit, state }, {id, ...user}) {
      await query('put', [`${USERS}/${id}.json`, user]);
      const users = state.users.map(item => item.id === id ? {id, ...user} : item);
      commit(MUTATION_STORE, { prop: 'users', data: users});
    },
    async [DELETE_USER] ({ commit, state }, id) {
      await query('delete', [`${USERS}/${id}.json`]);
      const users = state.users.filter(user => user.id !== id);
      commit(MUTATION_STORE, { prop: 'users', data: users });
    }
  },
});

async function query(method, data) {
  try {
    return await axios[method](...data);
  } catch(err) {
    console.log(`store -> query. METHOD - ${method}`, err);
    alert(`Unfortunately, something went wrong and therefore the task ${method} was not completed. Please reload the page and run the task again.`)
    throw new Error(err);
  }
}

export default store;