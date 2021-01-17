import { LOGO } from '@/data/scripts/static';
import { EVD_PAGE_LOAD_OK } from '@/data/scripts/events-types.js';
import { PageManager } from '@/data/scripts/main';

const HOME = 'route:router';

export default {
    actions: {
        watchHeader(ctx){
            // Загружена новая страница
            PageManager.on(EVD_PAGE_LOAD_OK, ctx.commit.bind(ctx, 'headerDataUpdate'));
        },

        switchMenuVisibility(ctx){
            ctx.commit('switchMenuVisibility');
        },

        hideMenu(ctx){
            ctx.commit('hideMenu');
        },

        showMenu(ctx){
            ctx.commit('showMenu');
        }
    },

    mutations: {
        headerDataUpdate(state, data){
            if(PageManager.current != 'router') {
                state.headerButtons = Array.concat([
                    {
                        highlight: true,
                        target: HOME,
                        label: '❮ Домой'
                    }
                ], data.buttons);
            } else {
                state.headerButtons = data.buttons;
            }

            state.headerData.icon = data.logo.src;
            state.headerData.link = data.title.link;
            state.headerData.name = data.title.label;
            state.headerData.depends = data.logo.themed;
        },

        switchMenuVisibility(state){
            state.headerMenuActive = !state.headerMenuActive;
        },

        hideMenu(state){
            state.headerMenuActive = false;
        },

        showMenu(state){
            state.headerMenuActive = true;
        }
    },

    state: {
        headerData: {
            depends: true,
            name: '#!AseWhy/Astecom',
            link: 'https://github.com/AseWhy',
            icon: LOGO
        },

        headerButtons: [

        ],

        headerMenuActive: false
    },

    getters: {
        headerData(state){
            return state.headerData;
        },

        headerButtons(state){
            return state.headerButtons;
        },

        headerMenuActive(state){
            return state.headerMenuActive;
        }
    }
};