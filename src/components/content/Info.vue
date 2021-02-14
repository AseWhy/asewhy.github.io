<template>
    <div class="info">
        <div class="last-updated" v-if="pageSection.date != null">
            {{ $locale['updated_label'][pageSection.lang] }} {{ pageSection.date }}
        </div>

        <div class="translator-tip" v-if="pageSection.data.get('Translator') != null">
            {{ $locale['translate_start'][pageSection.lang] }}

            <strong 
                class='translator-link' 
                v-html="pageSection.data.get('Translator').replace(/(.*)\((.*)\)/g, `<a href='http://$2'>$1</a>`)"
            ></strong>

            {{ $locale['translate_mid'][pageSection.lang] }}

            <a href="mailto:astecom@mail.ru">
                <strong>{{ $locale['common_here'][pageSection.lang] }}</strong>
            </a>. 

            {{ $locale['translate_end'][pageSection.lang] }}

            <a :href="pageSection.source">
                <strong>{{ $locale['common_here'][pageSection.lang] }}</strong>
            </a>
        </div>
    </div>
</template>


<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'content-info',

        computed: mapGetters(['pageSection'])
    }
</script>

<style>
    .info {
        grid-area: info;
    }

    .last-updated, .translator-tip {
        padding: 0.5rem;
        background: var(--default-dirty-color);
        margin: 0.25rem 0;
    }
</style>