import { EVD_SECTION_LOAD_OK, EVD_SECTION_LOAD_START, EVD_PAGE_LOAD_OK, EVD_PAGE_LOAD_ERROR} from '@/data/scripts/events-types.js';
import { PageManager } from '../../data/scripts/main';
import { LOGO } from '@/data/scripts/static.js';

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
            PageManager.on(EVD_PAGE_LOAD_ERROR, ctx.commit.bind(ctx, 'pageLoadError'));
            // Загружена новая страница
            PageManager.on(EVD_PAGE_LOAD_OK, ctx.commit.bind(ctx, 'pageLoadEnd'));
            // Секция начала загрузку
            PageManager.on(EVD_SECTION_LOAD_START, ctx.dispatch.bind(ctx, 'startPageLoad'));
            // Страница успешно згружена
            PageManager.on(EVD_SECTION_LOAD_OK, ctx.dispatch.bind(ctx, 'stopPageLoad'));
        },

        startPageLoad(ctx){
            ctx.commit('showLoader');
        },

        stopPageLoad(ctx, data){
            if(!data.currently && left)
                clearInterval(left);

            ctx.commit('sectionLoadEnd', data);

            if(!data.currently) {
                left = setTimeout(() => {
                    left = null;

                    ctx.commit('hideLoader', data);

                    goTo(data.target);
                }, 500);
            } else {
                ctx.commit('hideLoader', data);

                goTo(data.target);
            }
        }
    },

    mutations: {
        // Мутатор начала загрузки
        pageLoadEnd(state, data){
            state.pageError.status = false;
            state.pageData.header = data.header;
            state.pageData.loadsrc = data.logo.src;
            state.pageData.single = data.singlepage;
            state.pageData.sections = data.sections;
            state.pageData.name = PageManager.current;
        },

        // Мутатор ошибки загрузки
        pageLoadError(state, data){
            state.pageError.status = true;
            state.pageError.code = data.code;
            state.pageError.message = data.message;
        },

        // Мутатор показа загрузчика
        showLoader(state){
            state.pageSection.loading = true;
        },

        // Мутатор скрытия загрузчика
        hideLoader(state){
            state.pageError.status = false;

            state.pageSection.loading = false;
        },

        // Мутатор окончания загрузки
        sectionLoadEnd(state, data){
            state.pageSection.data = data.modified ? data.modified.toLocaleDateString() : null;
            state.pageSection.path = PageManager.path.join('/');
            state.pageSection.content = data.content;
        }
    },

    state: {
        pageSection: {
            date: null,
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