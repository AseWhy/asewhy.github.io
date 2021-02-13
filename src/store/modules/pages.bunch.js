// Import static data
import { LOGO } from '@/data/scripts/static';

// Import events
import { EVD_SECTION_LOAD_OK, EVD_SECTION_LOAD_START, EVD_PAGE_LOAD_OK, EVD_PAGE_LOAD_ERROR} from '@/data/scripts/events-types';

// Import mutations
import { PAGE_LOAD_ERROR, SHOW_LOADER, START_PAGE_LOAD, STOP_PAGE_LOAD, HIDE_LOADER, SECTION_LOAD_END, PAGE_LOAD_END, SWITCH_MENU_LANGUAGE, SWITCH_PREVIEW, PREVIEW_LOADED } from '../mutations';

// Import managers
import { PageManager } from '@/data/scripts/main';

// Static data
import { DEFAULT_LANGUAGE } from '../../data/scripts/static';

//
import InitEditor from '../../data/scripts/markdown-editor';

// Locale
import locale from '../../data/locale.json'

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


async function pagePostProcessing(ctx) {
    // Page post processing
    const mdtargets = document.querySelectorAll('.content-data .mdtarget');

    for(let value of mdtargets) {
        if(value.hasAttribute('inited'))
            continue;

        await InitEditor(value);

        value.setAttribute('inited', 1);
    }

    const forms = document.querySelectorAll('form');

    for(let value of forms) {
        (async value => {
            let sending = false;

            const success = value.querySelector('.content-data [type="success"]')
                , error = value.querySelector('.content-data [type="error"]')
                , fail = value.querySelector('.content-data [type="check-fail"]')
                , loading = value.querySelector('.content-data [type="loading"]');

            if(value.getAttribute('check')) {
                const responce = await fetch(value.getAttribute('check'));
                const json = await responce.json();

                if(!json) {
                    if(loading)
                        loading.classList = '';
                    if(fail)
                        fail.classList = 'active';
                } else {
                    if(loading)
                        loading.classList = '';
                }
            } else {
                if(loading)
                    loading.classList = '';
            }

            value.onsubmit = async (e) => {
                e.preventDefault();

                if(sending)
                    return;

                sending = true;

                const responce = await fetch(
                    value.action,
                    {
                        method: 'post',
                        body: new FormData(value)
                    }
                );

                if(loading)
                    loading.classList = 'active';

                const data = await responce.json();

                if(loading)
                    loading.classList = '';

                if(data) {
                    if(success)
                        success.classList = 'active';
                } else {
                    if(error)
                        error.classList = 'active';
                }

                sending = false;
            }
        })(value);
    }

    const previews = document.querySelectorAll('.content-data .preview');

    for(let preview of previews) {
        preview.addEventListener('click', ctx.commit.bind(ctx, SWITCH_PREVIEW, preview.getAttribute('src')));
    }
}

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

                    goTo(data.target);

                    ctx.commit(HIDE_LOADER, data);
                }, 500);
            } else {
                goTo(data.target);

                ctx.commit(HIDE_LOADER, data);
            }
        },

        switchLang(ctx){
            ctx.commit(SWITCH_MENU_LANGUAGE);
        },

        updateContent(ctx){
            pagePostProcessing(ctx);
        },

        hidePreview(ctx) {
            ctx.commit(SWITCH_PREVIEW, null)
        },

        activePreview(ctx, path) {
            ctx.commit(SWITCH_PREVIEW, path)
        },

        previewLoaded(ctx) {
            ctx.commit(PREVIEW_LOADED);
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
            state.pageSection.source = PageManager.source;

            (() => {
                const languages = Object.keys(locale.languages)
                    , current = languages.indexOf(PageManager.language);

                if(current + 2 == languages.length)
                    state.pageSection.lang_origin = 'left';
                else
                    state.pageSection.lang_origin = 'right';
            })();
        },

        // Мутатор изменения языка
        [SWITCH_MENU_LANGUAGE](state) {
            const languages = Object.keys(locale.languages)
                , current = languages.indexOf(PageManager.language);
            
            if(current + 1 == languages.length) {
                PageManager.language = state.pageSection.lang = languages[0];
            } else
                PageManager.language = state.pageSection.lang = languages[current + 1];

            if(current + 2 == languages.length)
                state.pageSection.lang_origin = 'left';
            else
                state.pageSection.lang_origin = 'right';

            PageManager.update();
        },

        [SWITCH_PREVIEW](state, data) {
            state.previewData.preview = data;
            state.previewData.previewLoaded = false;
        },

        [PREVIEW_LOADED](state) {
            state.previewData.previewLoaded = true;
        }
    },

    state: {
        pageSection: {
            data: new Map(),
            lang: DEFAULT_LANGUAGE,
            lang_origin: '',
            source: '',
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

        previewData: {
            preview: null,
            previewLoaded: false,
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

        previewData(state) {
            return state.previewData;
        },

        pageSection(state){
            return state.pageSection;
        }
    }
};