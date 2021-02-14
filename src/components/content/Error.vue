<template>
    <div class="error-content">
        <h2> 
            {{ $locale['error_header'][pageSection.lang] }} {{ pageError.code }}!
        </h2>

        <p class='p-error-message'>
            {{ $locale['error_message'][pageSection.lang] }} <br>

            <span class='p-error-label'> 
                {{ pageError.message }}
            </span>
        </p>

        <button class='button-go-home' a-href='route:router'>
            {{ $locale['error_go_home'][pageSection.lang] }}
        </button>
    </div>
</template>


<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'content-error',

        computed: mapGetters(['pageError'])
    }
</script>

<style>
    .p-error-label {
        display: block;
        margin: 0.25rem 0;
        padding: 0.5rem;
        border-left: 0.25rem solid var(--default-dirty-color);
    }

    .p-error-message {
        margin: 0;
    }

    .error-content {
        padding: 0.5rem;
    }
    
    .button-go-home {
        width: min(300pt, 100%);
        padding: 0.25rem;
        background-color: var(--default-color);
        border: none;
        text-align: left;
    }

    .button-go-home:hover {
        background-color: var(--default-dirty-color);
    }
</style>