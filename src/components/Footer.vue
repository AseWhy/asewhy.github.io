<template>
    <div class="footer">
        <div class="footer-content">
            <div class="tip">
                <h4> Лицензия </h4>
                
                <p class='copyright-text'>
                    Текст доступен по лицензии <a href="https://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike</a>, на дизайн и исходный код распостраняется лицензия <a href="https://www.isc.org/licenses/">BDS</a>.
                </p>
            </div>

            <div class="links">
                <h4> Ссылки </h4>
                <a href="https://github.com/AseWhy">Я на GitHub</a>
                <a href="https://vk.com/astecom">Я в Vk</a>
            </div>
        </div>

        <div class="copyright">
            <strong> © Astecom (2021) </strong>
        </div>
    </div>
</template>

<style>
    .footer {
        padding: 1rem;
        background-color: var(--default-dirty-color);
    }

    .footer-content {
        display: grid;
        grid-template-areas: '. .';
        gap: 0.5rem;
    }

    .footer-content > * {
        display: grid;
    }

    .copyright-text {
        padding: 0.5rem 0;
    }
</style>

<script>
    export default {
        name: 'v-footer'
    }
</script>