(() => {
    const hash = window.location.hash.substring(1).split('%')
        , path = hash.length > 1 ? hash[0].split('/').filter(e => e.length != 0) : []
        , w_id = hash.pop();

    window.name = 'child#' + w_id;

    window.root = new Object();

    window.root.subloc = {
        get path() {
            return Array.from(path);
        }
    };

    window.root.call = (command, data) => {
        window.parent.postMessage({
            sender: w_id,
            command, data
        }, '*')
    }

    window.root.updateTitle = title => {
        window.root.call('update.title', title);
    }

    window.root.updateFav = fav => {
        window.root.call('update.fav', fav);
    }

    window.root.updateHash = hash => {
        window.location.hash = hash;

        window.root.call('update.hash', hash);
    };
    
    window.root.open = url => {
        window.root.call('open.link', url);
    }

    window.root.go = page_id => {
        window.root.call('update.location', page_id);
    };

    window.addEventListener('load', () => {
        const fav = document.querySelector('link[rel="shortcut icon"]')
            , title = document.querySelector('title');

        if(fav != null)
            window.root.updateFav(fav.href);

        if(title != null)
            window.root.updateTitle(title.innerText);
    }, { once: true });

    {   
        window.root.utils = new Object();

        const dict = [
            'я,ю,э,ы,щ,ш,ч,ц,х,ф,у,т,с,р,п,о,н,м,л,к,й,и,з,ж,ё,е,д,г,в,б,а,-,ъ,ь'.split(','),
            'ya,yu,eh,yi,sh,sh,ch,c,h,ph,u,t,s,r,p,o,n,m,l,k,y,i,z,zh,yo,e,d,g,v,b,a,-,,'.split(',')
        ]

        window.root.utils.ruToUrlPure = npure => {
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

    // Load config
    {
        let config = document.querySelector('script[type="page-config"]'), start = new Array();

        class Config {
            constructor(){
                this._logo = null;

                this.buttons = new Array();

                this.buttons.add = (display, tag) => {
                    window.root.call('header.buttons.add', { display, tag });

                    this.buttons.push([display, tag]);
                };
            }

            setStart(path, tag){
                start[0] = path;
                start[1] = tag;
            }

            setTitle(title, url) {
                window.root.call('header.update.title', { title, url });
            }

            set logo(logo) {
                window.root.call('header.update.logo', logo);

                this._logo = logo;
            }

            get logo() {
                return this._logo;
            }
        }

        if(config != null) {
            new Function('config', '"use strict";' + config.innerText).call(new Config());
        }

        // При полной загрузке контента, загружаем переданный через location hash путь, или путь установленный в конфигурации
        window.addEventListener('DOMContentLoaded', () => {
            if(window.root.subloc.path.length === 0) {
                window.page.loadPage(start[0], start[1]);
            } else {
                window.page.loadPage(window.root.subloc.path[0], window.root.subloc.path[1]);
            }
        }, { once: true });
    }

    // Регистрирую слушатели
    {
        window.addEventListener('click', e => {
            if(e.target.tagName == 'A') {
                if(e.target.href.trim() != '')
                    window.root.call('open.link', e.target.href);
    
                e.preventDefault()
            } else if(e.target.tagName == 'BUTTON') {
                e.preventDefault();

                // Remove any old one
                const ripple = document.querySelectorAll('.ripple');

                if (ripple) {
                    for(let i = 0, leng = ripple.length; i < leng; i++)
                        ripple[i].remove();
                }
            
                // Setup
                let buttonWidth = e.target.offsetWidth, 
                    buttonHeight = e.target.offsetHeight;
            
                // Make it round!
                if(buttonWidth >= buttonHeight) {
                    buttonHeight = buttonWidth;
                } else {
                    buttonWidth = buttonHeight;
                }
            
                // Get the center of the element
                const x = e.offsetX == undefined ? e.layerX : e.offsetX - buttonWidth / 2
                    , y = e.offsetY == undefined ? e.layerY : e.offsetY - buttonHeight / 2;
            
                // Add the element
                const span = document.createElement('span');

                span.className = 'ripple';

                const s = span.style;

                s.width = buttonWidth + 'px';
                s.height = buttonHeight + 'px';

                s.top = y + 'px';
                s.left = x + 'px';

                e.target.appendChild(span);
            }
        });

        window.addEventListener('page:ch-go', e => {
            window.root.call('doc.location.change.started', e.detail);
        });
    
        window.addEventListener('page:go', e => {
            // Показываем заголовок при переходе на другой документ
            window.root.call('header.show');
            // Вызываем событие изменения текущей секции
            window.root.call('doc.section.change.started', e.detail);
        })
    
        window.addEventListener('page:ch-done', e => {
            // 
            window.root.call('doc.location.change.ended', { ...e.detail, headers: undefined });
        });
    
        window.addEventListener('page:done', e => {
            window.root.updateHash(e.detail.page_id + (e.detail.head != undefined ? '/' + e.detail.head : ''));

            window.root.call('doc.section.change.ended', { ...e.detail, headers: undefined });
        });
    
        window.addEventListener('scroll', e => {
            if(window.scrollY === 0)
                window.root.call('header.show');
            else
                window.root.call('header.hide');
        });

        window.addEventListener('message', message => {
            const data = message.data;

            if(data.receiver != w_id)
                return;
            
            switch(data.command) {
                case 'update.ui':
                    {
                        const container = document.querySelector('.container');

                        if(container) {
                            container.setAttribute('ui', data.data);
                        }
                    }
                break;
                case 'content.load':
                    window.page.loadPage(data.data, null);
                break;
            }
        });
    }
})();