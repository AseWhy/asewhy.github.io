(() => {
    const hash = window.location.hash.substring(1).split('%')
        , path = hash.length > 1 ? hash[0].split('/').filter(e => e.length != 0) : []
        , w_id = hash.pop();

    window.name = 'child#' + w_id;

    window.subloc = {
        get path() {
            return Array.from(path);
        }
    };

    window.call = (command, data) => {
        window.parent.postMessage({
            sender: w_id,
            command, data
        })
    }

    window.updateTitle = title => {
        call('update.title', title);
    }

    window.updateFav = fav => {
        call('update.fav', fav);
    }

    window.updateHash = hash => {
        window.location.hash = hash;

        call('update.hash', hash);
    };
    
    window.open = url => {
        call('open.link', url);
    }

    window.go = page_id => {
        call('update.location', page_id);
    };

    window.addEventListener('load', () => {
        const fav = document.querySelector('link[rel="shortcut icon"]')
            , title = document.querySelector('title');

        if(fav != null)
            updateFav(fav.href);

        if(title != null)
            updateTitle(title.innerText);
    }, { once: true });

    window.addEventListener('click', e => {
        console.log(e.target)

        if(e.target.tagName == 'A') {
            if(e.target.href.trim() != '')
                call('open.link', e.target.href);

            e.preventDefault()
        }
    });

    window.addEventListener('page:ch-go', e => {
        call('doc.location.change.started', e.detail);
    });

    window.addEventListener('page:go', e => {
        call('doc.section.change.started', e.detail);
    })

    window.addEventListener('page:ch-done', e => {
        call('doc.location.change.ended', { ...e.detail, headers: undefined });
    });

    window.addEventListener('page:done', e => {
        call('doc.section.change.ended', { ...e.detail, headers: undefined });
    })

    {
        const dict = [
            'я,ю,э,ы,щ,ш,ч,ц,х,ф,у,т,с,р,п,о,н,м,л,к,й,и,з,ж,ё,е,д,г,в,б,а,-,ъ,ь'.split(','),
            'ya,yu,eh,yi,sh,sh,ch,c,h,ph,u,t,s,r,p,o,n,m,l,k,y,i,z,zh,yo,e,d,g,v,b,a,-,,'.split(',')
        ]

        window.ru_ro_url_pure = npure => {
            let outp = new Array();

            for(let i = 0, leng = npure.length, cur; i < leng; i++) {
                if((cur = dict[0].indexOf(npure[i])) != -1) {
                    outp.push(dict[1][cur]);
                } else {
                    outp.push(npure[i]);
                }
            }

            return outp.join('').toLocaleLowerCase();
        }
    }

    {
        let start = [];

        const config = document.querySelector('script[type="page-config"]');

        class Config {
            constructor(){
                this._logo = null;

                this.buttons = new Array();

                this.buttons.add = (display, tag) => {
                    call('header.buttons.add', { display, tag });

                    this.buttons.push([display, tag]);
                };
            }

            setStart(path, tag){
                start[0] = path;
                start[1] = tag;
            }

            setTitle(title, url) {
                call('header.update.title', { title, url });
            }

            set logo(logo) {
                call('header.update.logo', logo);

                this._logo = logo;
            }

            get logo() {
                return this._logo;
            }
        }

        if(config != null) {
            new Function('config', '"use strict";' + config.innerText).call(new Config());
        }

        window.addEventListener('DOMContentLoaded', () => {
            if(window.subloc.path.length === 0) {
                loadPage(start[0], start[1]);
            } else {
                loadPage(window.subloc.path[0], window.subloc.path[1]);
            }
        });

        window.addEventListener('message', message => {
            const data = message.data;

            if(data.receiver != w_id)
                return;
            
            switch(data.command) {
                case 'content.load':
                    loadPage(data.data, null);
                break;
            }
        })
    }
})()