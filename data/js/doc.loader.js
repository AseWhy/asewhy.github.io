(() => {
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

    async function message(message) {
        const data = message.data;

        if(data.sender === w_id) {
            switch(data.command){
                case 'open.link':
                    if(await window.notify('Переход по ссылке', `Вы уверены, что хотите перейти на '${data.data}'?`, 'Да', 'Отмена'))
                        window.location = data.data;
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

    async function go(docname){
        console.log(c_docname + ' [to] -> ' + docname)

        if(await isExists(docname)) {
            updatePath([docname]);

            c_docname = docname;

            w_id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16);

            frame.src = './frames/' + docname + '.htm#' + path.slice(1).join('/') + '%' + w_id;
        } else {
            go('notfound')
        }
    }

    window.addEventListener('message', message);

    window.addEventListener('hashchange', () => {
        path = window.location.hash.substring(1).split('/');

        if(path[0] != c_docname)
            go(path[0]);
    })

    go(path[0]);
})();