import { EVD_PAGE_LOAD_OK, EVD_PAGE_LOAD_ERROR, EVD_SECTION_LOAD_OK, EVD_SECTION_LOAD_START } from './events-types';
import marked from 'marked';
import hljs from 'highlight.js';

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

marked.setOptions({
    highlight: (code, language) => {
        return hljs.highlight(language, code).value;
    }
})

export const PageManager = new class {
    constructor(default_entry){
        this._default_entry = default_entry;
        this._current = null;
        this._page_data = null;
        this._path = new Array();

        if(window.location.hash == '')
            this.goHome();
        else
            this.goToLocation();
    }

    parseLocation(){
        this._path = window.location.hash.substring(1).split('/');
    }

    updateLocation(){
        window.location.hash = this._path.join('/');
    }

    async goHome(){
        await this.load(this._default_entry);
    }

    async goToLocation(){
        this.parseLocation();

        await this.load(this._path[0], false);

        if(this._path[1] != null)
            await this.goTo(this._path[1], this._path[2]);
    }

    async load(pageId, auto_go_home = true){
        if(pageId == this._current)
            return;

        console.log('Req -> ' + pageId)

        const request = await fetch('../static/data/routes/' + pageId + '.json');

        if(request.status != 200) {
            window.dispatchEvent(new CustomEvent(EVD_PAGE_LOAD_ERROR, { detail: { code: request.status, message: 'Error retrieving block information' } }));

            return;
        }

        this._page_data = await request.json();
        this._cache = new Map();
        this._current = pageId;
        this._path[0] = this._current;

        this._page_data.logo.src = '../static/data/routes/' + this._page_data.logo.src;

        window.dispatchEvent(new CustomEvent(EVD_PAGE_LOAD_OK, {
            detail: {
                name: this._current,
                buttons: clone(this._page_data.header_buttons),
                title: clone(this._page_data.title),
                logo: clone(this._page_data.logo),
                favicon: this._page_data.favicon
            }
        }));

        if(auto_go_home)
            if(this._page_data.start)
                this.goTo(this._page_data.start);
            else if(this._page_data.content[0])
                this.goTo(this._page_data.content[0].name);
            else
                console.warn('Cannot find default content link for this section.');
    }

    async goTo(section, target = null) {
        if(section)
            this._path[1] = section;

        if(target)
            this._path[2] = target;

        this.updateLocation();

        window.dispatchEvent(new CustomEvent(EVD_SECTION_LOAD_START, { detail: { section, target } }));

        for(let i = 0, leng = this._page_data.content.length;i < leng; i++) {
            if(this._page_data.content[i].name === section) {
                if(!this._cache.has(section)) {
                    const request = await fetch('../static/data/routes/' + this._page_data.content[i].src);

                    if(request.status != 200) {
                        window.dispatchEvent(new CustomEvent(EVD_PAGE_LOAD_ERROR, { detail: { code: request.status, message: 'Error loading page' } }));
            
                        return;
                    }

                    const data = (await request.text()).replace(/^(#+)(.*)~\[([aA-zZаА-яЯёЁ_0-9]+)\]$/gm, "$1 <span id='$3' class='marker'></span>$2\n");

                    this._cache.set(section, data);

                    window.dispatchEvent(new CustomEvent(EVD_SECTION_LOAD_OK, { detail: { content: marked(
                            data
                    ), target} }));

                    return;
                } else {
                    window.dispatchEvent(new CustomEvent(EVD_SECTION_LOAD_OK, { detail: { content: marked(
                        this._cache.get(section)
                    ), target } }));
                }
            }
        }

        window.dispatchEvent(new CustomEvent(EVD_PAGE_LOAD_ERROR, { detail: { code: 404, message: 'Error loading page' } }));

        return;
    }
}('router');