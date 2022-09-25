import { getLoginAPI } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async  LoginAction({ commit }, logindata) {
      const { data: { token }} = await getLoginAPI(logindata)

      commit('SET_TOKEN', token)
    }
  }
}
