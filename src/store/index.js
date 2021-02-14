import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import pages from './modules/pages.bunch';
import header from './modules/header.bunch';

// Managers
import { ThemesManager } from '@/data/scripts/main';

// Event types
import { EVD_THEME_LOAD_END } from '../data/scripts/events-types';

// Mutation types
import { UPDATE_THEME_DATA } from './mutations';

// Connect vuex
Vue.use(Vuex);

export default new Vuex.Store({
    actions: {
        watchTheme(ctx){
            // Тема была измененена
            ThemesManager.on(EVD_THEME_LOAD_END, ctx.commit.bind(ctx, UPDATE_THEME_DATA));
        },

        switchTheme(){
            ThemesManager.next();
        }
    },

    mutations: {
        [UPDATE_THEME_DATA](state, theme){
            state.appTheme = theme.name;
        }
    },

    state: {
        appTheme: ThemesManager.current
    },

    getters: {
        appTheme(state){
            return state.appTheme;
        },

        isWebGlSupports() {
            try{
                var canvas = document.createElement( 'canvas' ); 
                return !! window.WebGLRenderingContext && ( 
                    canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) );
            }catch( e ) { 
                return false;
            } 
        }
    },

    modules: { pages, header }
});