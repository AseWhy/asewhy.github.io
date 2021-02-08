// Import static data
import { LOGO } from '@/data/scripts/static';

// Import events
import { EVD_PAGE_LOAD_OK } from '@/data/scripts/events-types';

// Import managers
import { PageManager } from '@/data/scripts/main';

// Import mutations
import { HEADER_DATA_UPDATE, HIDE_MENU, SHOW_MENU, SWITCH_MENU_VISIBILITY, SWITCH_PAGE_SELECTION } from '../mutations';

// Declare home route
const HOME = 'route:router';

// Export locales
import locale from '@/data/locale.json';
import { EVD_SECTION_LOAD_OK } from '../../data/scripts/events-types';

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
        }
    },

    mutations: {
        [HEADER_DATA_UPDATE](state, data){
            if(PageManager.current != 'router') {
                state.headerButtons = Array.concat([
                    {
                        highlight: true,
                        target: HOME,
                        label: locale['header_back_buttons']
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