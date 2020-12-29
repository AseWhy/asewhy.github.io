{
    const nav = document.querySelector('.nav-bar');

    window.addEventListener('page:ch-done', e => {
        nav.innerText = '';

        for(let i = 0, leng = e.detail.headers.length, cur_level = -1, prev_level = -1, stack = [ nav ];i < leng; i++) {
            const label = document.createElement('button');

            label.innerText = e.detail.headers[i].innerText;

            e.detail.headers[i].id = window.root.utils.ruToUrlPure(e.detail.headers[i].id);

            label.setAttribute('target', e.detail.page_id + '#' + e.detail.headers[i].id)

            label.classList = 'common-label left-variator';

            label.addEventListener('click', window.page.drop.bind(null, label));

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
    });
};