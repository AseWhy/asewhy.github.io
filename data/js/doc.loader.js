{
    let w_id = 0, c_docname = 'root';

    let frame = document.getElementById('main-frame'),
        path = window.location.hash.substring(1).split('/');

    function isExists(docname) {
        return new Promise(res => {
            fetch('./frames/' + docname + '.htm')
                .catch(() => res(false))
                .then((e) => {
                    res(e.status == 200);
                })
        })
    }

    function updatePath(data){
        path.splice(0, data.length, data);

        window.location.hash = path.join('/');
    }

    function loadFromMenu(tag) {
        window.leftMenuChange();

        load(tag);
    }

    async function message(message) {
        const data = message.data;

        if(data.sender === w_id) {
            switch(data.command){
                case 'open.link':
                    if(await window.notify('Переход по ссылке', `Вы уверены, что хотите перейти на '${data.data}'?`, 'Да', 'Отмена'))
                        window.location = data.data;
                break;
                case 'doc.scroll':
                    {
                        const block = document.getElementById('div-block-target');
                        
                        block.style.opacity = data.data == 0 ? 1 : 0;
                        block.style.height = data.data == 0 ? '5.5em' : 0;
                    }
                break;
                case 'doc.section.change.started':
                    {
                        const name = document.getElementById('div-name-target')
                            , path = document.getElementById('div-path-target');


                        name.innerText = data.data.header;
                        path.innerText = c_docname + ' -> ' + data.data.page_id + (data.data.head != null ? ' -> ' + data.data.head : '');
                    }
                break;
                case 'header.buttons.add':
                    {
                        const container = document.getElementById('target-header-buttons')
                            , button = document.createElement('button')
                            , sepo = document.createElement('span');

                        button.classList = 'header-button';
                        button.innerText = data.data.display
                        button.onclick = loadFromMenu.bind(null, data.data.tag);

                        sepo.innerText = '/';
                        sepo.classList = 'header-sepo desktop-element'

                        if(container.children.length > 0)
                            container.appendChild(sepo);

                        container.appendChild(button);
                    }
                break
                case 'header.buttons.clear':
                    document.getElementById('target-header-buttons').innerHTML = '';
                break;
                case 'header.update.title':
                    {
                        const title = document.getElementById('target-header-title');

                        title.innerText = data.data.title;
                        title.href = data.data.url;
                    }
                break;
                case 'header.update.logo':
                    {
                        const logo = document.getElementById('target-header-logo');

                        logo.src = 'frames/' + data.data;
                    }
                break;
                case 'open.notify':
                    window.notify(...data.data);
                break;
                case 'update.hash':
                    window.location.hash = c_docname + '/' + data.data;
                break;
                case 'update.location':
                    window.location.hash = data.data;
                break;
                case 'update.fav':
                    document.getElementById('fav').href = data.data;
                break;
                case 'update.title':
                    document.getElementById('title').innerText = data.data;
                break;
            }
        };
    }

    async function call(command, data) {
        frame.contentWindow.postMessage({
            command: command,
            receiver: w_id,
            data
        })
    }

    async function whell(tag){
        console.log('whell ' + c_docname + ' [into]-> ' + tag);

        call('content.whell', tag);
    }

    async function load(dir){
        console.log('load ' + c_docname + ' [into]-> ' + dir);

        call('content.load', dir);
    }

    async function go(docname){
        console.log(c_docname + ' [to] -> ' + docname);

        const container = document.getElementById('target-header-buttons');

        container.innerHTML = '';

        if(docname != 'router'){
            const button = document.createElement('button');

            button.classList = 'header-button';
            button.innerText = '<- На главную'
            button.onclick = () => {
                window.leftMenuChange();

                window.location.hash = 'router';
            };

            container.appendChild(button);
        }

        {
            const block = document.getElementById('div-block-target');

            block.style.opacity = 0;
            block.style.height = '5.5em';
        }
        
        if(await isExists(docname)) {
            updatePath([docname]);

            c_docname = docname;

            w_id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16);

            frame.src = './frames/' + docname + '.htm#' + path.slice(1).join('/') + '%' + w_id;
        } else {
            go('notfound');
        }

        frame.addEventListener('load', () => call('update.ui', window.ui), { once: true } );
    }

    window.addEventListener('message', message);

    window.addEventListener('hashchange', () => {
        path = window.location.hash.substring(1).split('/');

        if(path[0] != c_docname)
            go(path[0]);
    })
    
    go(path[0] != '' ? path[0] : 'router');

    window.call = call;
}