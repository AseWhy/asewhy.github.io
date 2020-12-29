{
    let w_id = 0, c_docname = 'root';

    let frame = document.getElementById('main-frame'),
        path = window.location.hash.substring(1).split('/');

    function setHash(hash) {
        window.location.hash = hash;

        path = hash.substring(1).split('/');
    }

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
        window.root.leftMenuChange();

        load(tag);
    }

    async function message(message) {
        const data = message.originalEvent.data;

        if(data.sender === w_id) {
            switch(data.command){
                case 'open.link':
                    if(await window.root.notify('Переход по ссылке', 'Вы уверены, что хотите перейти на \'' + data.data + '\'?', 'Да', 'Отмена'))
                        window.location = data.data;
                break;
                case 'header.hide':
                    $('#div-block-target')
                        .css({ 
                            opacity: 0,
                            height: 0
                        });
                break;
                case 'header.show':
                    $('#div-block-target')
                        .css({ 
                            opacity: 1,
                            height: '5.5em'
                        });
                break;
                case 'doc.section.change.started':
                    $('#div-name-target').text(data.data.header);
                    $('#div-path-target').text(c_docname + ' -> ' + data.data.page_id + (data.data.head != null ? ' -> ' + data.data.head : ''));
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
                    $('#target-header-buttons').html('');
                break;
                case 'header.update.title':
                    $('#target-header-title')
                        .text(data.data.title)
                        .attr('href', data.data.url);
                break;
                case 'header.update.logo':
                    $('#target-header-logo')
                        .attr('src', './frames/' + data.data);
                break;
                case 'open.notify':
                    window.root.notify(...data.data);
                break;
                case 'update.hash':
                    setHash(c_docname + '/' + data.data);
                break;
                case 'update.location':
                    setHash(data.data);
                break;
                case 'update.fav':
                    $('#fav').attr('href', data.data);
                break;
                case 'update.title':
                    $('#title').text(data.data);
                break;
            }
        };
    }

    async function call(command, data) {
        frame.contentWindow.postMessage({
            command: command,
            receiver: w_id,
            data
        }, '*')
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

        $('#target-header-buttons').html('');

        if(docname != 'router'){
            const button = document.createElement('button');

            button.classList = 'header-button';
            button.innerText = '🏠 На главную'
            button.onclick = () => {
                window.root.leftMenuChange();

                window.location.hash = 'router';
            };

            $('#target-header-buttons').append(button);
        }

        $('#div-block-target').css({ opacity: 1, height: '5.5em' });
        
        if(await isExists(docname)) {
            updatePath( [docname] );

            c_docname = docname;

            w_id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16);

            frame.src = './frames/' + docname + '.htm#' + path.slice(1).join('/') + '%' + w_id;
        } else {
            go('notfound');
        }

        $(frame).one('load', () => call('update.ui', window.root.ui));
    }

    $(window).on('message', message);

    $(window).on('hashchange', () => {
        path = window.location.hash.substring(1).split('/');

        if(path[0] != c_docname)
            go(path[0]);
    })
    
    go(path[0] != '' ? path[0] : 'router');

    window.call = call;
};