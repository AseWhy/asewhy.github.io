import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import HeaderStyles from "./styles/Header.module.scss"

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
        className={HeaderStyles.Header}
        data-sticky={sticky}
    >
        <div
            className={HeaderStyles.leftSide}
        >
            <a
                href="https://github.com/AseWhy"
                className={HeaderStyles.headerButton}
            >
                AseWhy/Astecom
            </a>
        </div>

        <div
            className={HeaderStyles.rightSide}
        >
            <Link
                to="main"
                smooth={true}
                className={HeaderStyles.headerButton}
            >
                Главная
            </Link>

            <Link
                to="about"
                smooth={true}
                offset={-200}
                className={HeaderStyles.headerButton}
            >
                Обо мне
            </Link>

            <Link
                to="work"
                smooth={true}
                offset={-200}
                className={HeaderStyles.headerButton}
            >
                Опыт работы
            </Link>

            <Link
                to="contacts"
                smooth={true}
                offset={-200}
                className={HeaderStyles.headerButton}
            >
                Контакты
            </Link>
        </div>
    </header>
}