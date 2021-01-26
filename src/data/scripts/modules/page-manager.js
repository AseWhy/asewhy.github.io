import { EVD_PAGE_LOAD_OK, EVD_PAGE_LOAD_ERROR, EVD_SECTION_LOAD_OK, EVD_SECTION_LOAD_START } from '../events-types';
import { Module } from '../astecoms-module';
import marked from 'marked';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import { DEFAULT_LANGUAGE } from '../static';

hljs.registerLanguage('js', javascript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);

marked.setOptions({
    highlight: (code, language) => {
        return hljs.highlight(language, code).value;
    }
})

class LocationData {
    constructor(initial){
        this.favicon = initial.favicon != null ? initial.favicon : '';
        this.logo = initial.logo != null ? initial.logo : new Object();
        this.title = initial.title != null ? initial.title : new Object();
        this.buttons = initial.buttons != null ? initial.buttons : new Array();
        this.start = initial.start != null ? initial.start : '';
        this.content = initial.content != null ? initial.content : new Array();
        this.sections = initial.sections != null ? initial.sections : new Array();
        this.singlepage = initial.singlepage != null ? initial.singlepage : true;
        this.header = initial.header != null ? initial.header : '/static/data/textures/1.jpg';

        // logo handle
        this.logo.src = this.logo.src != null ? '../static/data/routes/' + initial.logo.src : '';
        this.logo.themed = this.logo.themed != null ? this.logo.themed : true;

        // title handle
        this.title.label = this.title.label != null ? this.title.label : '';
        this.title.link = this.title.link != null ? this.title.link : '';
    }
}

class PageManagerEvent {
    constructor(detail) {
        Object.assign(this, detail);
    }
}

export const PageManager = new class PageManager extends Module {
    constructor(default_entry){
        super('PageManager');

        this._default_entry = default_entry;
        this._current = null;
        this._page_data = null;
        this._language = this.get('language') || DEFAULT_LANGUAGE;
        this._args = new Map();
        this._cache = new Map();
        this._path = new Array();

        if(window.location.hash == '')
            this.goHome();
        else
            this.goToLocation();

        window.addEventListener('hashchange', this.goToLocation.bind(this));
    }

    parseLocation(){
        const raw = window.location.hash.substring(2).split('?');
        const path = raw[0] || '';
        const params = raw[1] || '';

        this._args = new Map(params.split('&').map(e => {
            const data = e.split('=');

            if(data.length == 2)
                return [data[0], data[1]];
            else
                return null;
        }).filter(e => e != null));

        this._path = path.split('/');

        this.parseParams();
    }

    updateLocation(){
        window.location.hash = '!' + this._path.join('/') + (this._args.size > 0 ? '?' + [...this._args.entries()].map(([key, value]) => key + '=' + value).join('&') : '');
    }

    parseParams(){
        for(const [key, value] of this._args) {
            switch(key) {
                case 'lang':
                    this._language = value;
                break;
            }
        }
    }

    update() {
        this._cache.delete(this._path[1]);
        
        return this.goTo(this._path[1]);
    }

    get path(){
        return Array.from(this._path);
    }

    get current(){
        return this._current;
    }

    set language(value) {
        this._language = value;
        
        this.set('language', this._language);
        this._args.set('lang', this._language);

        this.updateLocation();
    }

    get language(){ 
        return this._language;
    }

    async goHome(){
        await this.load(this._default_entry);
    }

    async goToLocation(e){
        if(e && e.oldURL)
            return;

        this.parseLocation();

        await this.load(this._path[0], false);

        if(this._path[1] != null)
            await this.goTo(this._path[1], this._path[2]);
    }

    async goLink(link) {
        let page;

        if(link.substring(0, 6) === 'route:') {
            const endmarker = link.indexOf('/');

            page = link.substring(6, endmarker != -1 ? endmarker : Infinity);

            if(endmarker != -1)
                link = link.substring(endmarker + 1);
            else
                link = null;
        }

        if(page)
            await this.load(page, link == null);

        if(link != null) {
            const division = link.split('#');

            await this.goTo(division[0], division[1]);
        }
    }

    async load(pageId, auto_go_home = true){
        if(pageId == this._current)
            return;

        console.log('Request page -> ' + pageId);

        const request = await fetch('../static/data/routes/' + pageId + '.json');

        if(request.status != 200) {
            this.emit(EVD_PAGE_LOAD_ERROR, new PageManagerEvent({code: request.status, message: 'Error retrieving block information'}));

            return;
        }
        
        try {
            this._page_data = new LocationData(await request.json());
            this._cache = new Map();
            this._path[0] = this._current = pageId;

            this.emit(EVD_PAGE_LOAD_OK, new PageManagerEvent(this._page_data));

            if(auto_go_home)
                if(this._page_data.start)
                    this.goTo(this._page_data.start);
                else if(this._page_data.content[0])
                    this.goTo(this._page_data.content[0].name);
                else
                    console.warn('Cannot find default content link for this section.');
        } catch (e) {
            this.emit(EVD_PAGE_LOAD_ERROR, new PageManagerEvent({ code: 418, message: 'Error while processing responce data.' }));
        }
    }

    async goTo(section, target = null) {
        // Указывает на то, что пошла загрузка страницы, которая в данный момент загружена
        const currently = section == this._path[1];

        if(section)
            this._path[1] = section;
        else
            delete this._path[1];

        if(target)
            this._path[2] = target;
        else
            delete this._path[2];

        this.updateLocation();

        this.emit(EVD_SECTION_LOAD_START, new PageManagerEvent({ section, target, path: this._path, currently }));

        for(let i = 0, leng = this._page_data.content.length;i < leng; i++) {
            if(this._page_data.content[i].name === section) {
                if(!this._cache.has(section)) {
                    const request = await (() => {
                        const url = '../static/data/routes/' + this._page_data.content[i].src;

                        return fetch(url.replace(/\$lang/g, this._language));
                    })();

                    if(request.status != 200) {
                        this.emit(EVD_PAGE_LOAD_ERROR, new PageManagerEvent({ code: request.status, message: 'Error loading page' }));
            
                        return;
                    }

                    const PageData = new Map()
                        , data = (await request.text())
                            .replace(/^(#+)(.*)~\[([aA-zZаА-яЯёЁ_0-9]+)\]$/gm, "$1 <span id='$3' class='marker'></span>$2\n")
                            .replace(/^@define[ \t]+([^ \t]+)[ \t]+([^\n]*)$/gm, (m, p1, p2) => {
                                PageData.set(p1, p2);

                                return '';
                            })
                            .replace(
                                />[ \t]*\[([^\]]+)\][ \t]*([аА-яЯёЁ0-9aA-zZ \t_]+)[ \t]*{([^}]*)}/gm, 
                                (m, p1, p2, p3) => {
                                    return `<li class="timeline" ${
                                        p1 == '$' ? 'started="true"' : p1 == '#' ? 'ended="true"' : ''
                                    }><div class="timeline-data-container"><code>${
                                        p1 != '$' && p1 != '#' ? p1 : ''
                                    }</code>${
                                        p1 != '$' && p1 != '#' ? ' - ' : ''
                                    }<strong>${
                                        p2
                                    }</strong><div class="timeline-description">${
                                        marked(p3.trim())
                                    }</div></div></li>`
                                }
                            )
                        , modified = request.headers.get('last-modified') ? new Date(request.headers.get('last-modified')) : null;

                    this._cache.set(section, { data, modified, PageData });

                    this.emit(EVD_SECTION_LOAD_OK, new PageManagerEvent({ 
                        content: marked(
                            data
                        ),
                        target,
                        modified,
                        PageData,
                        path: this._path,
                        currently
                    }));

                    return;
                } else {
                    const cache = this._cache.get(section);

                    this.emit(EVD_SECTION_LOAD_OK, new PageManagerEvent({ 
                        content: marked(
                            cache.data
                        ), 
                        target,
                        modified: cache.modified,
                        PageData: cache.PageData,
                        path: this._path,
                        currently 
                    }));

                    return;
                }
            }
        }

        this.emit(EVD_PAGE_LOAD_ERROR, new PageManagerEvent({ code: 404, message: 'Error loading page' }));

        return;
    }
}('router');