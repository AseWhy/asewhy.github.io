(() => {
    const path = document.querySelector('.renderpath')
        , name = document.querySelector('.div-name')
        , nav = document.querySelector('.nav-bar');

    window.addEventListener('page:ch-go', e => {
        nav.innerText = 'Загружаю...';
    });

    window.addEventListener('page:go', e => {
        name.innerText = e.detail.header;

        path.innerText = '#! ' + e.detail.page_id + (e.detail.head != undefined ? ' -> ' + e.detail.head : '');
    })

    window.addEventListener('page:ch-done', e => {
        nav.innerText = '';

        for(let i = 0, leng = e.detail.headers.length, level = 0, stack = [ nav ];i < leng; i++) {
            const label = document.createElement('div');

            label.innerText = e.detail.headers[i].innerText;

            e.detail.headers[i].id = window.ru_ro_url_pure(e.detail.headers[i].id);

            label.setAttribute('target', e.detail.page_id + '#' + e.detail.headers[i].id)

            label.classList = 'common-label';

            label.addEventListener('click', window.drop.bind(null, label));

            stack[stack.length - 1].appendChild(label)
        }
    })
})()