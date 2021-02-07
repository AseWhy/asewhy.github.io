import 'simplemde/dist/simplemde.min.css';
import * as SimpleMDE from 'simplemde';
import locale from '../locale.json';
import marked from 'marked';
import { PageManager } from './main';

const MAX_CHARS = 2000;

export default function InitEditor(element) {
    let editor = new SimpleMDE({ 
        element,

        previewRender: function(plainText) {
            return marked(plainText);
        },

        status: ["autosave", "lines", "words", "cursor", {
            className: "characters",

            defaultValue: function(el) {
                el.innerHTML = "0";
            },

            onUpdate: function(el) {
                el.innerHTML = editor.value().length + ' ' + locale['common_of'][PageManager.language] + ' ' + MAX_CHARS;
            }
        }]
    });

    editor.codemirror.on('beforeChange', (instance, changes) => {
        if(editor.value().length >= MAX_CHARS && changes.origin !== "+delete"){
            changes.cancel();
        }

        element.value = editor.value();
    });
}