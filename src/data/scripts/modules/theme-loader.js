import { Module } from '../astecoms-module';

import { EVD_THEME_LOAD_END, EVD_THEME_LOAD_START } from '../events-types';

class ThemeEvent {
    constructor(detail) {
        Object.assign(this, detail);
    }
}

export const ThemesManager = new class ThemesManager extends Module {
    constructor(config = null){
        super('ThemesManager');

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

        this._current = this.get('current') || 'default';
        this._current_index = this.get('current_index') || 0;

        this.load(this._current);
    }

    get current(){
        return this._current;
    }

    __load__(name){
        const themes = Object.keys(this.config);
        const theme = this.config[name];

        this.emit(EVD_THEME_LOAD_START, new ThemeEvent({ name, theme }));

        for(let key in theme) {
            document.documentElement.style.setProperty(key, theme[key]);
        }

        this.emit(EVD_THEME_LOAD_END, new ThemeEvent({ name, theme }));

        this._current_index = themes.indexOf(name);
        this._current = name;

        this.set('current', this._current);
        this.set('current_index', this._current_index);
    }

    next(){
        const arrays = Object.keys(this.config);

        if(++this._current_index >= arrays.length) {
            this.load(arrays[this._current_index = 0]);
        } else {
            this.load(arrays[this._current_index]);
        }

        return arrays[this._current_index];
    }

    load(name) {
        if(this.config[name] != null) {
            this.__load__(name);
        } else {
            throw new Error('No theme like "' + name + '"');
        }
    }
}();