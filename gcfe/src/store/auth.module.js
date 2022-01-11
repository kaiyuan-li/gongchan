import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      try {
        const response = await AuthService.login(user)
        if (response.accessToken) {
          localStorage.setItem('user', JSON.stringify(response))
        }
        commit('loginSuccess', response)
        return response

      } catch (e) {
        commit('loginFailure')
      }
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    async register({ commit }, user) {
      try {
        const res = await AuthService.register(user)
        if (res.accessToken) {
          localStorage.setItem('user', JSON.stringify(res))
          commit('loginSuccess', res)
        }
      } catch (e) {
        commit('registerFailure')
      }
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
