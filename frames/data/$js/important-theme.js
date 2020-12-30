

{
    window.themes = new class WindowThemesManager {
        constructor(def = 'default', config = null){
            this.config = config || {
                default: {
                    '--sub-color': 'rgb(55, 55, 55)',
                    '--default-color': 'white',
                    '--imgs-def-filter': 'none',
                    '--default-dirty-color': 'whitesomke',
                    '--default-semi-opacity': 'rgba(255, 255, 255, 0.9)',
                    '--default-semi-opacity-1': 'rgba(255, 255, 255, 0.25)',
                    '--base-transition': '300ms cubic-bezier(0.215, 0.610, 0.355, 1)'
                },

                darked: {
                    '--imgs-def-filter': 'invert(1)',
                    '--sub-color': 'rgb(200, 200, 200)',
                    '--default-color': 'rgb(25, 25, 25)',
                    '--default-dirty-color': 'rgb(15, 15, 15)',
                    '--default-semi-opacity': 'rgba(25, 25, 25, 0.9)',
                    '--default-semi-opacity-1': 'rgba(25, 25, 25, 0.25)',
                    '--base-transition': '300ms cubic-bezier(0.215, 0.610, 0.355, 1)'
                }
            }

            this.current = def;

            this.load(def);
        }

        __load__(name){
            const theme = this.config[name];

            this.current = name;

            window.dispatchEvent(new CustomEvent('theme:load:start', { detail: { name, theme } }));

            for(let key in theme) {
                document.documentElement.style.setProperty(key, theme[key]);
            }

            window.dispatchEvent(new CustomEvent('theme:load:end', { detail: { name, theme } }));
        }

        load(name) {
            if(this.config[name] != null) {
                this.__load__(name);
            } else {
                throw new Error('No theme like "' + name + '"');
            }
        }
    };
}