(() => {
    const m_window = document.querySelector('.modal')
        , m_title = document.querySelector('.modal-title')
        , m_body = document.querySelector('.modal-body')
        , m_ok = document.querySelector('.modal-ok')
        , m_cancel = document.querySelector('.modal-cancel')

    window.notify = (title, body, mc_ok = 'Ок', mc_cancel = 'Отмена') => {
        m_window.classList.add('active');

        return new Promise(res => {
            function close(reply){
                res(reply)

                m_window.classList.remove('active');
            }

            m_ok.innerText = mc_ok;

            if(mc_cancel != null) {
                m_cancel.style.display = 'block';

                m_cancel.innerText = mc_cancel;
            } else {
                m_cancel.style.display = 'none';
            }

            m_ok.onclick = close.bind(null, true);
            m_cancel.onclick = close.bind(null, false);

            m_title.innerText = title;
            m_body.innerText = body;
        })
    }
})()