import { EVD_THEME_LOAD_END, EVD_THEME_LOAD_START } from './events-types';

export const WindowThemesManager = new class {
    constructor(def, config = null){
        this.config = config || {
            default: {
                '--sub-color': 'rgb(55, 55, 55)',
                '--default-color': 'white',
                '--imgs-def-filter': 'none',
                '--default-dirty-color': 'whitesmoke',
                '--defult-ripple-color': 'rgba(0, 0, 0, 0.4)',
                '--default-semi-opacity': 'rgba(255, 255, 255, 0.9)',
                '--default-semi-opacity-1': 'rgba(255, 255, 255, 0.25)',
                '--base-transition': '300ms cubic-bezier(0.215, 0.610, 0.355, 1)'
            },

            darked: {
                '--imgs-def-filter': 'invert(0.9)',
                '--sub-color': 'rgb(200, 200, 200)',
                '--default-color': 'rgb(25, 25, 25)',
                '--default-dirty-color': 'rgb(15, 15, 15)',
                '--defult-ripple-color': 'rgba(200, 200, 200, 0.4)',
                '--default-semi-opacity': 'rgba(25, 25, 25, 0.9)',
                '--default-semi-opacity-1': 'rgba(25, 25, 25, 0.25)',
                '--base-transition': '300ms cubic-bezier(0.215, 0.610, 0.355, 1)'
            }
        }

        this._current = def;

        this.load(def);
    }

    get current(){
        return this._current;
    }

    __load__(name){
        const theme = this.config[name];

        window.dispatchEvent(new CustomEvent(EVD_THEME_LOAD_START, { detail: { name, theme } }));

        for(let key in theme) {
            document.documentElement.style.setProperty(key, theme[key]);
        }

        window.dispatchEvent(new CustomEvent(EVD_THEME_LOAD_END, { detail: { name, theme } }));

        localStorage.setItem('user:settings:theme', name);

        this._current = name;
    }

    load(name) {
        if(this.config[name] != null) {
            this.__load__(name);
        } else {
            throw new Error('No theme like "' + name + '"');
        }
    }
}(localStorage.getItem('user:settings:theme') || 'default');