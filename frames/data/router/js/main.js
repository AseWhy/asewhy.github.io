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

        for(let i = 0, leng = e.detail.headers.length, cur_level = -1, prev_level = -1, stack = [ nav ];i < leng; i++) {
            const label = document.createElement('div');

            label.innerText = e.detail.headers[i].innerText;

            e.detail.headers[i].id = window.ru_ro_url_pure(e.detail.headers[i].id);

            label.setAttribute('target', e.detail.page_id + '#' + e.detail.headers[i].id)

            label.classList = 'common-label left-variator';

            label.addEventListener('click', window.drop.bind(null, label));

            cur_level = parseInt(e.detail.headers[i].tagName[1]);

            if(cur_level == prev_level || prev_level == -1)
                stack[stack.length - 1].appendChild(label);
            else if(cur_level > prev_level) {
                const sublevel = document.createElement('div');

                sublevel.classList = 'sub-level';

                stack[stack.length - 1].appendChild(sublevel);

                stack.push(sublevel);

                sublevel.appendChild(label);
            } else if(cur_level < prev_level) {
                stack.splice(stack.length - (prev_level - cur_level), Infinity)
                
                stack[stack.length - 1].appendChild(label);
            }

            prev_level = cur_level;
        }
    })
})()