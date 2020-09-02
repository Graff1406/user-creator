import { shallowMount, createLocalVue } from '@vue/test-utils';
import User from '@/views/User';
import $text from '@/assets/text.json';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

const options = {
  data() {
    return {
      axis: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    windowSize() {
      return {widthMoreOrEqual600px: 600}
    },
  }
}

describe('HomePage component', () => {
  let actions;
  let store;
  let state;
  let wrapper;
  beforeAll(() => {
    state = {
      users: [{
        id: '123',
        name: 'Name',
        email: 'Email',
        address: 'Address',
        created_at: 1234,
      }]
    };
    store = new Vuex.Store({
      actions,
      state,
    });
    wrapper = shallowMount(User, { 
      mocks: { $text },
      mixins: [options],
      store, 
      router,
      localVue,
     });
  });
  test("check the prop axis", () => {
    expect(typeof wrapper.vm.axis.x).toBe('number');
  });
  test("check the prop user", () => {
    expect(wrapper.vm.user).toEqual(state.users[0]);
  });
  test("check the method deleteUser", () => {
    const deleteUser = jest.fn();
    wrapper.setMethods({ deleteUser });
    wrapper.find("#btn-delete-user").trigger("click");
    expect(deleteUser).toBeCalled();
  });
})