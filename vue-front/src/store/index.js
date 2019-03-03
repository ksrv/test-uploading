import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';
import Env from '@/services/env';

Vue.use(Vuex);


export default new Vuex.Store({
  modules,
  strict: !Env.isProduction,
});
