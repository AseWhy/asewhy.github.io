<template>
    <div class="footer">
        <div class="footer-content">
            <div class="tip">
                <h4> Лицензия </h4>
                <p class='copyright-text'>
                    Текст доступен по лицензии <a href="https://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike</a>
                </p>
            </div>

            <div class="links">
                <h4> Ссылки </h4>
                <a href="https://github.com/AseWhy">Я на GitHub</a>
                <a href="https://vk.com/astecom">Я в Vk</a>
            </div>
        </div>

        <div class="copyright">
            <strong> © Astecom (2020) </strong>
        </div>
    </div>
</template>

<style>
    .footer {
        padding: 0.5em;
        background-color: var(--default-dirty-color);
        margin-bottom: 0.5em;
    }

    .footer-content {
        display: grid;
        grid-template-areas: '. .';
        gap: 0.5em;
    }

    .footer-content > * {
        display: grid;
    }

    .copyright-text {
        padding: 0.5em 0;
    }
</style>