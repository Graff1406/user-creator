import texts from "../assets/text.json";
export default {
  install(Vue) {
    Vue.prototype.$text = texts;
  }
};
