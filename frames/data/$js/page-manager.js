{
    window.page = new Object();

    const PAGES = new Map()
        , IGNORE = ['type', 'name']
        , CONTENT = document.querySelector('*[rendertarget="true"]')
        , HEAD = document.querySelector('.header');

    let last = '', load = false;

    const GO_EV = 'page:go'
        , CHANGE_GO = 'page:ch-go'
        , DONE_EV = 'page:done'
        , CHANGE_DONE_EV = 'page:ch-done';

    const HEADERS = [
        'H1',
        'H2',
        'H3',
        'H4',
        'H5',
        'H6'
    ]

    marked.setOptions({
        highlight: (code, language) => {
            return hljs.highlight(language, code).value;
        }
    })

    const wait = (tm) => {
        return new Promise(res => setTimeout(res, tm));
    }

    const onAllLoaded = (elems) => {
        let load_c = 0, total_c = elems.length;

        if(total_c != 0)
            return new Promise(res => {
                function load(){
                    load_c ++;
        
                    if(load_c >= total_c)
                        res();
                }

                for(let i = 0; i < total_c; i++) {
                    if(elems[i].complete || !(elems[i] instanceof HTMLImageElement)) {
                        load();

                        continue;
                    }

                    elems[i].addEventListener('load', load, { once: true });
                    elems[i].addEventListener('error', load, { once: true });
                }
            });
    }

    const whell = to => {
        if(load)
            return;

        try {
            let head_d = element.querySelector('#' + to);

            if(head_d){
                const rect = (HEADERS.includes(head_d.tagName) ? head_d : head_d.parentElement).getBoundingClientRect();
                const y = rect.top + window.pageYOffset - (HEAD && HEAD.offsetHeight || 0);
    
                document.documentElement.scrollTo({top: y, behavior: 'smooth'});
            } else {
                window.scrollTo({top: 0, behavior: 'smooth'});
    
                window.root.updateHash(last);
            }
        } catch (e) {
            window.root.updateHash(last);
        }
    }

    const loadPage = async (page_id, head) => {
        if(load)
            return;

        const chunck = PAGES.get(page_id)
            , updated = last != page_id;

        if(chunck != null) {
            if(updated)
                window.dispatchEvent(new CustomEvent(CHANGE_GO, { detail: { page_id, head, header: chunck.header } }));

            window.dispatchEvent(new CustomEvent(GO_EV, { detail: { page_id, head, header: chunck.header } }));

            if(updated) {
                CONTENT.classList.add('transit');

                CONTENT.innerHTML = '';

                load = true;

                // Искуственная задержка, чтобы все выглядело плавно
                await wait(1000);

                element = document.createElement('div');

                for(let [key, value] in chunck.attrs){
                    if(key != 'class')
                        element.setAttribute(key, value);
                    else {
                        element.classList = value;
                    }
                }

                element.classList.add('wrap');

                element.innerHTML = marked(chunck.content);

                last = page_id;

                CONTENT.append(element);

                CONTENT.classList.remove('transit');

                await wait(200);

                load = false;
            } else {
                element = CONTENT.querySelector('.wrap');
            }

            // Ожидаем окончания загрузки
            await onAllLoaded(element.getElementsByTagName('img'));

            if(head) 
                whell(head);

            if(updated)
                window.dispatchEvent(new CustomEvent(CHANGE_DONE_EV, { detail: { page_id, head, header: chunck.header, headers: element.querySelectorAll('h1, h2, h3, h4, h5, h6') } }));
            
            window.dispatchEvent(new CustomEvent(DONE_EV, { detail: { page_id, head, header: chunck.header, headers: element.querySelectorAll('h1, h2, h3, h4, h5, h6') } }));
        }
    }

    {
        const pages = document.querySelectorAll('script[type="page-pattern"]');

        for(let i = 0, leng = pages.length, tabw = 0, tabr; i < leng;i++) {
            tabw = pages[i].innerHTML.match(/^([\t ]+)/m)[0];
            tabr = new RegExp('^' + (tabw != null ? tabw : ''), 'gm');

            PAGES.set(pages[i].getAttribute('name'), {
                attrs: new Map(
                    Array.from(pages[i].attributes)
                        .map(
                            e => [e.name, e.value]
                        )
                        .filter(
                            e => !IGNORE.includes(e[0])
                        )
                ),
                content: pages[i].innerHTML
                    .replace(tabr, '')
                    .replace(/^(#+)(.*)~\[([aA-zZаА-яЯёЁ_0-9]+)\]$/gm, "$1 <span id='$3' class='marker'></span>$2\n"),
                header: (pages[i].innerHTML.match(/^(?:\t| )*#+(?:\t| )*(.+)$/m) || [])[1]
            });
    
            pages[i].remove();
        }
    }

    {
        const links = document.querySelectorAll('*[type="c-link"');

        function drop(t, e) {
            e.preventDefault();
            
            const target = (t.getAttribute('target') || '').split('#');

            if(target.length > 0)
                loadPage(target[0], target[1]);
        }

        for(let i = 0, leng = links.length; i < leng; i++) {
            links[i].addEventListener('click', drop.bind(null, links[i]));
        }

        window.page.drop = drop;
    }

    window.page.loadPage = loadPage;
    window.page.whell = whell;
};