<template>
    <div class="preview" :class="{
        active: previewData.preview != null
    }">
        <div class="loader" :class='{ active: !previewData.previewLoaded }'>
            <div class="mask">
                <img :src="pageData.loadsrc">
            </div>
        </div>


        <div class="preview-container">
            <iframe ref="frame" class='preview-controller'>

            </iframe>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    const Cache = {
        has(e) {
            return localStorage.getItem('cache:'+e) != null;
        },

        get(e) {
            return localStorage.getItem('cache:'+e);
        },

        set(k, v) {
            localStorage.setItem('cache:'+k, v);
        },

        clear(){
            for(let key in localStorage) {
                if(key.substring(0, 6) === 'cache:')
                    localStorage.removeItem(key);
            }
        }
    };

    async function loadFrame(frame, src) {
        if(!src)
            return;

        const host = src.split('/').slice(0, -1).join('/');

        const raw = await fetch(src);
        const data = await raw.text();

        const document = frame.contentWindow.document;

        function ieval(raw){
            const script = document.createElement("script");

            script.append(raw);

            document.body.append(script);
        }

        function istyl(raw){
            const script = document.createElement("style");

            script.append(raw);

            document.head.append(script);
        }

        const parser = new DOMParser();

        const doc = parser.parseFromString(data, "text/html");

        let scripts = doc.getElementsByTagName('script');
        let styles = doc.querySelectorAll('styles, link[rel="stylesheet"]');

        scripts = [...scripts].map(e => { e.remove(); return e.hasAttribute('src') ? ['src', e.getAttribute('src')] : ['raw', e.innerHTML]; })
        styles = [...styles].map(e => { e.remove(); return e.hasAttribute('href') ? ['href', e.getAttribute('href')] : ['raw', e.innerHTML]; })

        document.documentElement.innerHTML = doc.documentElement.innerHTML;

        console.log(document);

        for(let style of styles) {
            if(style[0] == 'href') {
                let c_src = style[1];

                if(c_src.substring(0, 4) != 'http') {
                    c_src = host + '/' + c_src
                }


                if(Cache.has(c_src)) {
                    istyl(Cache.get(c_src));
                } else {
                    const responce = await fetch(c_src)
                        , raw = await responce.text();

                    Cache.set(c_src, raw);

                    istyl(raw)
                }
            } else {
                istyl(`${style[1]}`);
            }
        }

        for(let script of scripts) {
            if(script[0] == 'src') {
                let c_src = script[1];

                if(c_src.substring(0, 4) != 'http') {
                    c_src = host + '/' + c_src
                }

                if(Cache.has(c_src)) {
                    ieval(Cache.get(c_src));
                } else {
                    const responce = await fetch(c_src)
                        , raw = await responce.text();

                    Cache.set(c_src, raw);

                    ieval(raw)
                }
            } else {
                ieval(`(function(window){${script[1]}})(window)`);
            }
        }
    }

    export default {
        computed: mapGetters([ 'previewData', 'pageData', 'headerData' ]),

        methods: mapActions([ 'showBackButton', 'hidePreview', 'restoreOriginalsButtons', 'previewLoaded' ]),

        mounted(){
            loadFrame(this.$refs.frame, this.previewData.preview);
        },

        async updated(){
            const _ = this;

            if(_.previewData.preview != null) {
                _.showBackButton(() => {
                    _.hidePreview();
                    _.restoreOriginalsButtons();
                });

                await loadFrame(_.$refs.frame, _.previewData.preview);

                _.previewLoaded();
            }
        }
    }
</script>

<style>
    .container > .preview {
        transition: opacity var(--base-transition), height 1s cubic-bezier(1, 0, 1, 0);
        background: var(--default-semi-opacity);
        pointer-events: none;
        animation: hide 1s;
        position: absolute;
        top: 3.5rem;
        display: grid;
        width: 100%;
        height: 0;
        opacity: 0;
        height: 0;
        left: 0;
    }

    .container > .preview.active {
        opacity: 1;
        height: calc(100% - 3.5rem);
        transition: opacity var(--base-transition), height 0s;
        pointer-events: all;
    }

    .preview-container {
        height: 100%;
        width: 100%;
        margin: auto;
        word-break: break-all;
        text-align: justify;
        overflow: hidden;
    }

    .container > .preview .preview-controller {
        width: 100%;
        height: 100%;
        border: none;
    }

    @supports ((-webkit-backdrop-filter: blur(2rem)) or (backdrop-filter: blur(2rem))) {
        .container > .preview {
            background-color: var(--default-semi-opacity-1);
            backdrop-filter: blur(2rem);
        }
    }
</style>