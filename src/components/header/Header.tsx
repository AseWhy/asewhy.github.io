import { useEffect, useState } from "react";
import { Link } from "react-scroll";

import HeaderModule from "./Header.module.scss"

const NAV_ITEMS: { to: string; label: string; offset?: number }[] = [
    { to: "main", label: "Главная" },
    { to: "about", label: "Обо мне", offset: -200 },
    { to: "work", label: "Опыт работы", offset: -200 },
    { to: "contacts", label: "Контакты", offset: -200 },
];

export function Header() {
    const [ sticky, setSticky ] = useState(false);
    const [ open, setOpen ] = useState(false);

    function onScrollListener() {
        setSticky(window.scrollY > 0);
    }

    useEffect(() => {
        window.addEventListener("scroll", onScrollListener);

        return () => window.removeEventListener("scroll", onScrollListener);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";

        return () => { document.body.style.overflow = ""; };
    }, [ open ]);

    return <header
        className={HeaderModule.Header}
        data-sticky={sticky}
        data-open={open}
    >
        <div
            className={HeaderModule.leftSide}
        >
            <a
                href="https://github.com/AseWhy"
                className={HeaderModule.brand}
            >
                AseWhy/Astecom
            </a>
        </div>

        <button
            type="button"
            className={HeaderModule.burger}
            aria-label="Меню"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
        >
            <span/>
            <span/>
            <span/>
        </button>

        <div
            className={HeaderModule.rightSide}
        >
            {
                NAV_ITEMS.map(item => <Link
                    key={item.to}
                    to={item.to}
                    smooth={true}
                    offset={item.offset}
                    className={HeaderModule.headerButton}
                    onClick={() => setOpen(false)}
                >
                    {item.label}
                </Link>)
            }
        </div>
    </header>
}
