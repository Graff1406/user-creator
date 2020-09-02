import { shallowMount } from '@vue/test-utils';
import FormUser from '@/components/FormUser.vue';
import $text from '@/assets/text.json';

const propsData = { 
  updateData: false,
  user: { 
    name: 'Name', 
    email: 'Email', 
    address: 'Address' 
  },
};

 const windowSize = {
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

describe('FormUser component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallowMount(FormUser, { 
      propsData, 
      mocks: { $text },
      mixins: [windowSize],
    });
  });
  test("check the prop updateData", () => {
    expect(wrapper.props().updateData).toBeFalsy();
  });
  test("check the prop user", () => {
    expect(wrapper.props().user).toEqual(propsData.user);
  });
  test("check the prop nameLabel", () => {
    expect(wrapper.props().nameLabel).toEqual(propsData.user.nameLabel);
  });
  test("check the prop emailLabel", () => {
    expect(wrapper.props().emailLabel).toEqual(propsData.user.emailLabel);
  });
  test("check the prop addressLabel", () => {
    expect(wrapper.props().addressLabel).toEqual(propsData.user.addressLabel);
  });
  test("check the prop axis.x", () => {
    expect(wrapper.vm.axis.x).toBe(0);
  });
  test("check the method saveUser", () => {
    const saveUser = jest.fn();
    wrapper.setMethods({ saveUser });
    wrapper.find("#btn-save-user").trigger("click");
    expect(saveUser).toBeCalled();
  });
});
