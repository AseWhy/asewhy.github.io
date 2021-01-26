// Import static data
import { LOGO } from '@/data/scripts/static';

// Import events
import { EVD_SECTION_LOAD_OK, EVD_SECTION_LOAD_START, EVD_PAGE_LOAD_OK, EVD_PAGE_LOAD_ERROR} from '@/data/scripts/events-types';

// Import mutations
import { PAGE_LOAD_ERROR, SHOW_LOADER, START_PAGE_LOAD, STOP_PAGE_LOAD, HIDE_LOADER, SECTION_LOAD_END, PAGE_LOAD_END, SWITCH_MENU_LANGUAGE } from '../mutations';

// Import managers
import { PageManager } from '@/data/scripts/main';

// Static data
import { DEFAULT_LANGUAGE } from '../../data/scripts/static';

// Биндим таймаут на этот адрес, чтобы в случе чего его сбросить.
let left;

// Прокручивает страницу до определенного элемента
function goTo(target_d){
    if(target_d) {
        const target = document.getElementById(target_d);
        const header = document.querySelector('nav.header');

        if(target) {
            const rect = target.getBoundingClientRect();

            document.body.scrollBy({ 
                top: rect.top - header.offsetHeight,
                behavior: 'smooth'
            });
        } else {
            document.body.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } else {
        document.body.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

export default {
    actions: {
        watchPage(ctx){
            // Загрузка не прошла без ошибок
            PageManager.on(EVD_PAGE_LOAD_ERROR, ctx.commit.bind(ctx, PAGE_LOAD_ERROR));
            // Загружена новая страница
            PageManager.on(EVD_PAGE_LOAD_OK, ctx.commit.bind(ctx, PAGE_LOAD_END));
            // Секция начала загрузку
            PageManager.on(EVD_SECTION_LOAD_START, ctx.dispatch.bind(ctx, START_PAGE_LOAD));
            // Страница успешно згружена
            PageManager.on(EVD_SECTION_LOAD_OK, ctx.dispatch.bind(ctx, STOP_PAGE_LOAD));
        },

        startPageLoad(ctx){
            ctx.commit(SHOW_LOADER);
        },

        stopPageLoad(ctx, data){
            if(!data.currently && left)
                clearInterval(left);

            ctx.commit(SECTION_LOAD_END, data);

            if(!data.currently) {
                left = setTimeout(() => {
                    left = null;

                    ctx.commit(HIDE_LOADER, data);

                    goTo(data.target);
                }, 500);
            } else {
                ctx.commit(HIDE_LOADER, data);

                goTo(data.target);
            }
        },

        switchLang(ctx){
            ctx.commit(SWITCH_MENU_LANGUAGE);
        }
    },

    mutations: {
        // Мутатор начала загрузки
        [PAGE_LOAD_END](state, data){
            state.pageError.status = false;
            state.pageData.header = data.header;
            state.pageData.loadsrc = data.logo.src;
            state.pageData.single = data.singlepage;
            state.pageData.sections = data.sections;
            state.pageData.name = PageManager.current;
        },

        // Мутатор ошибки загрузки
        [PAGE_LOAD_ERROR](state, data){
            state.pageError.status = true;
            state.pageError.code = data.code;
            state.pageError.message = data.message;
        },

        // Мутатор показа загрузчика
        [SHOW_LOADER](state){
            state.pageSection.loading = true;
        },

        // Мутатор скрытия загрузчика
        [HIDE_LOADER](state){
            state.pageError.status = false;

            state.pageSection.loading = false;
        },

        // Мутатор окончания загрузки
        [SECTION_LOAD_END](state, data){
            state.pageSection.date = data.modified ? data.modified.toLocaleDateString() : null;
            state.pageSection.path = PageManager.path.join('/');
            state.pageSection.content = data.content;
            state.pageSection.data = data.PageData;
            state.pageSection.lang = PageManager.language;
        },

        [SWITCH_MENU_LANGUAGE](state, data) {
            PageManager.language = state.pageSection.lang = PageManager.language == 'ru' ? 'us' : 'ru';

            PageManager.update();
        }
    },

    state: {
        pageSection: {
            date: null,
            data: new Map(),
            lang: DEFAULT_LANGUAGE,
            content: 'Pending...',
            path: 'Pending...',
            loading: false,
        },

        pageData: {
            name: 'Pending...',
            sections: [],
            header: '',
            single: false,
            loadsrc: LOGO
        },

        pageError: {
            status: false,
            code: -1,
            message: ''
        }
    },

    getters: {
        pageData(state){
            return state.pageData;
        },

        pageError(state){
            return state.pageError;
        },

        pageSection(state){
            return state.pageSection;
        }
    }
};