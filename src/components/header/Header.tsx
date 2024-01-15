import { useEffect, useState } from "react";
import { Link } from "react-scroll";

import HeaderModule from "./Header.module.scss"

export function Header() {
    const [ sticky, setSticky ] = useState(false);

    function onScrollListener(event: Event) {
        setSticky(window.scrollY > 0);
    }

    useEffect(() => {
        window.addEventListener("scroll", onScrollListener);

        return () => window.removeEventListener("scroll", onScrollListener);
    }, []);

    return <header
        className={HeaderModule.Header}
        data-sticky={sticky}
    >
        <div
            className={HeaderModule.leftSide}
        >
            <a
                href="https://github.com/AseWhy"
                className={HeaderModule.headerButton}
            >
                AseWhy/Astecom
            </a>
        </div>

        <div
            className={HeaderModule.rightSide}
        >
            <Link
                to="main"
                smooth={true}
                className={HeaderModule.headerButton}
            >
                Главная
            </Link>

            <Link
                to="about"
                smooth={true}
                offset={-200}
                className={HeaderModule.headerButton}
            >
                Обо мне
            </Link>

            <Link
                to="work"
                smooth={true}
                offset={-200}
                className={HeaderModule.headerButton}
            >
                Опыт работы
            </Link>

            <Link
                to="contacts"
                smooth={true}
                offset={-200}
                className={HeaderModule.headerButton}
            >
                Контакты
            </Link>
        </div>
    </header>
}