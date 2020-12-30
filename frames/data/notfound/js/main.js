(() => {
    const foreced = document.querySelectorAll('*[type="forced"]');

    function force(el, to) {
        let leng = to.length, buffer = '';

        el.innerHTML = buffer = '';

        buffer = buffer.split('')

        function next(){
            let changes = 0;

            for(let i = 0; i < leng; i++) {
                if(buffer[i] != to[i]) {
                    buffer[i] = Math.random() - 0.05 * changes > 0.95 ? to[i] : '';

                    changes++;
                }
            }

            el.innerHTML = buffer.join('');

            if(changes !== 0)
                requestAnimationFrame(next);
        }

        requestAnimationFrame(next);
    }

    for(let i = 0, leng = foreced.length; i < leng; i++){
        force(foreced[i], foreced[i].getAttribute('to'));
    }
})();