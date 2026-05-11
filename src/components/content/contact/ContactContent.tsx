import { Parallax } from "react-scroll-parallax"

import ContactContentModule from "./ContactContent.module.scss"

const IconVk = () => <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M13.16 17.4c-5.46 0-8.94-3.86-9.08-10.27h2.74c.09 4.7 2.23 6.7 3.86 7.11V7.13h2.62v3.86c1.57-.17 3.22-2 3.78-3.86h2.56c-.43 2.27-2.16 4.1-3.38 4.86 1.22.62 3.18 2.22 3.94 5.31h-2.82c-.59-1.93-2.09-3.42-4.08-3.62v3.62h-.71z"/>
</svg>;

const IconTelegram = () => <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M21.94 4.6 18.6 20.1c-.25 1.1-.91 1.38-1.85.86l-5.1-3.76-2.46 2.37c-.27.27-.5.5-1.03.5l.37-5.2L16.97 7c.41-.37-.09-.57-.64-.2L5.66 13.49l-5.04-1.58c-1.1-.34-1.12-1.1.23-1.62L20.5 3.06c.92-.34 1.72.21 1.44 1.54z" transform="translate(0.6 0)"/>
</svg>;

const IconGithub = () => <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.21 1.79 1.21 1.04 1.79 2.74 1.27 3.41.97.11-.76.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/>
</svg>;

const IconMail = () => <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 5h18v14H3zM3 6l9 7 9-7"/>
</svg>;

export function ContactContent() {
    return <div
        className={ContactContentModule.ContactContent}
        id="contacts"
    >
        <h2> Поругаться со мной </h2>

        <Parallax
            opacity={ [ 0.5, 2 ] }
        >
            <div
                className={ContactContentModule.CotactsFlex}
            >
                <a href="https://vk.com/astecom"><IconVk/>Я в ВК</a>
                <a href="https://t.me/astecom"><IconTelegram/>Я в телеграмме</a>
                <a href="https://github.com/AseWhy"><IconGithub/>Я на гитхабе</a>
                <a href="mailto:astecom@mail.ru"><IconMail/>Моя почта 1</a>
                <a href="mailto:astecoms@gmail.com"><IconMail/>Моя почта 2</a>
            </div>
        </Parallax>
    </div>
}
