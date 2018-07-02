export default {
  namespaced: true,
  state: { hidshow: false },
  mutations: {
    mutahidshow (state,value) {
      state.hidshow = value;
    }
  }
}