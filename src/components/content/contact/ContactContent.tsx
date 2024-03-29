import { Parallax } from "react-scroll-parallax"

import ContactContentModule from "./ContactContent.module.scss"

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
                <a href="https://vk.com/astecom">Я в ВК</a> |
                <a href="https://t.me/astecom">Я в телеграмме</a> |
                <a href="https://github.com/AseWhy">Я на гитхабе</a> |
                <a href="mailto:astecom@mail.ru">Моя почта 1</a> |
                <a href="mailto:astecoms@gmail.com">Моя почта 2</a>
            </div>
        </Parallax>
    </div>
}