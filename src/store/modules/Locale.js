import axios from 'axios';

const namespaced = false;

const Locale = {
  actions: {
    locale({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('LOCALE_SUCCESS', data);
      });
    }
  },
  getters: {
    getLocale(state) {
      return state.locale;
    }
  },
  mutations: {
    LOCALE_SUCCESS(state, data) {
      state.locale = data.locale;
    }
  },
  namespaced,
  state: () => ({
    locale: 'en-Gb'
  })
};

export default Locale;
