// Import static data
import { LOGO } from '@/data/scripts/static';

// Import events
import { EVD_PAGE_LOAD_OK } from '@/data/scripts/events-types';

// Import managers
import { PageManager } from '@/data/scripts/main';

// Import mutations
import { HEADER_DATA_UPDATE, HIDE_MENU, RESTORE_ORIGINALS_BUTTONS, SHOW_BACK_BUTTON, SHOW_MENU, SWITCH_MENU_VISIBILITY, SWITCH_PAGE_SELECTION } from '../mutations';

// Declare home route
const HOME = 'route:router';

// Export locales
import locale from '@/data/locale.json';

// Section events
import { EVD_SECTION_LOAD_OK } from '../../data/scripts/events-types';
import Vue from 'vue';

// Buttons
const BUTTONS_BUFFER = new Array();

export default {
    actions: {
        watchHeader(ctx){
            // Загружена новая страница
            PageManager.on(EVD_PAGE_LOAD_OK, ctx.commit.bind(ctx, HEADER_DATA_UPDATE));
            // Изменена текущая секция
            PageManager.on(EVD_SECTION_LOAD_OK, ctx.commit.bind(ctx, SWITCH_PAGE_SELECTION));
        },

        switchMenuVisibility(ctx){
            ctx.commit(SWITCH_MENU_VISIBILITY);
        },

        hideMenu(ctx){
            ctx.commit(HIDE_MENU);
        },

        showMenu(ctx){
            ctx.commit(SHOW_MENU);
        },

        showBackButton(ctx, onback) {
            ctx.commit(SHOW_BACK_BUTTON, onback);
        },

        restoreOriginalsButtons(ctx) {
            ctx.commit(RESTORE_ORIGINALS_BUTTONS);
        }
    },

    mutations: {
        [HEADER_DATA_UPDATE](state, data){
            if(PageManager.current != 'router') {
                state.headerButtons = Array.concat([
                    {
                        highlight: true,
                        target: HOME,
                        label: locale['header_home_buttons']
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

        [SWITCH_PAGE_SELECTION](state) {
            state.headerData.selected = PageManager.path[1];
        },

        [SWITCH_MENU_VISIBILITY](state){
            state.headerMenuActive = !state.headerMenuActive;
        },

        [HIDE_MENU](state){
            state.headerMenuActive = false;
        },

        [SHOW_MENU](state){
            state.headerMenuActive = true;
        },

        [SHOW_BACK_BUTTON](state, onback) {
            if(!state.backbutton) {
                BUTTONS_BUFFER.push(...state.headerButtons);

                state.headerButtons.splice(0, Infinity, {
                    highlight: true,
                    target: HOME,
                    clicked: onback,
                    label: locale['header_back_buttons']
                });

                state.backbutton = true;
            }
        },

        [RESTORE_ORIGINALS_BUTTONS](state) {
            if(state.backbutton) {
                state.headerButtons.splice(0, Infinity);
                
                Vue.nextTick(() => {
                    state.headerButtons.push(...BUTTONS_BUFFER);
                    BUTTONS_BUFFER.splice(0, Infinity);
                })

                state.backbutton = false;
            }
        }
    },

    state: {
        headerData: {
            depends: true,
            selected: null,
            name: '#!AseWhy/Astecom',
            link: 'https://github.com/AseWhy',
            icon: LOGO
        },

        headerButtons: [

        ],

        backbutton: false,

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