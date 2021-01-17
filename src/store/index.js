import Vue from 'vue';
import Vuex from 'vuex';

import pages from './modules/pages.bunch';
import header from './modules/header.bunch';

import { ThemesManager } from '@/data/scripts/main';

Vue.use(Vuex);

export default new Vuex.Store({
    actions: {
        switchTheme(ctx){
            ThemesManager.next();

            ctx.commit('updateThemeData');
        }
    },

    mutations: {
        updateThemeData(state){
            state.appTheme = ThemesManager.current;
        }
    },

    state: {
        appTheme: ThemesManager.current
    },

    getters: {
        appTheme(state){
            return state.appTheme;
        }
    },

    modules: { pages, header }
});