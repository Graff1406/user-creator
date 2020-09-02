import { shallowMount, createLocalVue } from '@vue/test-utils';
import Home from '@/views/Home';
import $text from '@/assets/text.json';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

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
    }
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
      state
    });
    wrapper = shallowMount(Home, { 
      mocks: { $text },
      mixins: [options],
      store, 
      localVue,
     });
  });
  console.log('LOG: wrapper', wrapper)

  test("check the prop axis.x", () => {
    expect(typeof wrapper.vm.axis.x).toBe('number');
  });
  test("check the mounted hoock", () => {
    expect(typeof Home.mounted).toBe('function');
  });
  test("check the prop users", () => {
    expect(wrapper.vm.users).toEqual(state.users);
  });
})