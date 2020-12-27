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

    window.updateTitle = title => call('update.title', title);

    window.updateFav = fav => call('update.fav', fav);

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

    (() => {
        const dict = [
            'я,ю,э,ы,щ,ш,ч,ц,х,ф,у,т,с,р,п,о,н,м,л,к,й,и,з,ж,ё,е,д,г,в,б,а,-'.split(','),
            'ya,yu,eh,yi,sh,sh,ch,c,h,ph,u,t,s,r,p,o,n,m,l,k,y,i,z,zh,yo,e,d,g,v,b,a,-'.split(',')
        ]

        window.ru_ro_url_pure = npure => {
            let outp = new Array();

            for(let i = 0, leng = npure.length, cur; i < leng; i++) {
                if((cur = dict[0].indexOf(npure[i])) != -1) {
                    outp.push(dict[1][cur]);
                }
            }

            return outp.join('')
        }
    })();

    window.addEventListener('click', e => {
        if(e.target.tagName == 'A') {
            if(e.target.href.trim() != '')
                call('open.link', e.target.href);

            e.preventDefault()
        }
    })
})()