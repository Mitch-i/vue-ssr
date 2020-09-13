import {Store} from 'vuex';
import * as mutations from './mutations';
import * as getters from './getters';
import axios from 'axios';


const createStore = (state) => {
    return new Store({
        state,
        mutations,
        getters,
        actions: {
          async getUsers ({ commit }) {
 		    await axios.get('http://localhost:3000/users')
	        .then(response => commit('setUsers', response.data));
	      }
	    },
        strict: process.env.NODE_ENV !== 'production',
    });
};

export default createStore;