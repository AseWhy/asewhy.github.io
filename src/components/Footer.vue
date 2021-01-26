<template>
    <div class="footer">
        <div class="footer-content">
            <div class="tip">
                <h4> {{ $locale['footer_license_header'][pageSection.lang] }} </h4>
                
                <p class='copyright-text'>
                   {{ $locale['footer_license_text_start'][pageSection.lang] }}
                   <a href="https://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike</a>
                   {{ $locale['footer_license_text_end'][pageSection.lang] }}
                   <a href="https://opensource.org/licenses/BSD-2-Clause">BDS</a>.
                </p>
            </div>

            <div class="links">
                <h4> {{ $locale['footer_links_header'][pageSection.lang] }} </h4>
                <a href="https://github.com/AseWhy/asewhy.github.io"> {{ $locale['footer_links_d_repo'][pageSection.lang] }} </a>
                <a href="https://github.com/AseWhy"> {{ $locale['footer_links_d_git'][pageSection.lang] }} </a>
                <a href="mailto:astecom@mail.ru"> {{ $locale['footer_links_d_contact'][pageSection.lang] }} </a>
                <a href="https://vk.com/astecom"> {{ $locale['footer_links_d_vk'][pageSection.lang] }} </a>
            </div>
        </div>

        <div class="copyright">
            <strong> © Astecom (2021) </strong>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'v-footer',

        computed: mapGetters([ 'pageSection' ])
    }
</script>

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
        grid-auto-rows: min-content;
    }

    .copyright-text {
        padding: 0.5rem 0;
    }
</style>