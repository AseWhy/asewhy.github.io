<template>
    <div class="modal" :class="{ active: active }">
        <div class="modal-container">
            <div class="modal-header"> {{ header }} </div>
            <div class="modal-body" v-html="message" v-if="!input"></div>
            <input class="modal-input" type="password" ref="modal_input" v-if="input" :placeholder="header">
            <div class="modal-controls">
                <button class="modal-confirmation-control modal-confirmation-ok" v-on:click='Action(true)'> {{ buttons.ok }} </button>
                <button class="modal-confirmation-control modal-confirmation-cancel" v-if="confirmation" v-on:click='Action(false)'> {{ buttons.cancel }} </button>
            </div>
        </div>
    </div>
</template>

<script>
    let wait = () => {};

    export default {
        name: 'v-modal',

        methods: {
            Action(status) {
                this.$set(this, 'active', false);
                
                wait(status);
            }
        },

        data() {
            return {
                confirmation: true,
                active: false,
                input: false,
                message: '',
                header: '',
                buttons: {
                    ok: 'Ок',
                    cancel: 'Отмена'
                }
            }
        },

        mounted(){
            window.astecConfirm = message => {
                this.$set(this, 'confirmation', true);
                this.$set(this, 'message', message);
                this.$set(this, 'header', 'Подтверждение');
                this.$set(this, 'input', false);
                this.$set(this, 'active', true);

                return new Promise(res => {
                    wait = status => {
                        res(status);
                    }
                });
            };

            window.astecInput = message => {
                this.$set(this, 'confirmation', true);
                this.$set(this, 'input', true);
                this.$set(this, 'header', message);
                this.$set(this, 'active', true);

                return new Promise(res => {
                    wait = status => {
                        if(status) {
                            res(this.$refs.modal_input.value);
                        } else {
                            res(false);
                        }
                    }
                });
            };
        }
    }
</script>

<style>
    .modal {
        transition: opacity var(--base-transition), height 1s cubic-bezier(1, 0, 1, 0);
        background: var(--default-semi-opacity);
        pointer-events: none;
        animation: hide 1s;
        position: absolute;
        display: grid;
        width: 100vw;
        opacity: 0;
        height: 0;
        left: 0;
        top: 0;
    }

    .modal.active {
        opacity: 1;
        height: 100vh;
        transition: opacity var(--base-transition), height 0s;
        pointer-events: all;
    }

    .modal-input {
        width: calc(100% - 0.5rem);
        padding: 0.25rem;
        margin: 0.5rem 0.25rem;
        background: var(--default-color);
        border: none;
    }

    .modal-container {
        width: min(300pt, 85%);
        height: auto;
        margin: auto;
        background-color: var(--default-dirty-color);
        word-break: break-all;
        text-align: justify;
        padding: 0.5rem;
    }

    .modal-controls {
        padding: 0.25em;
        margin-top: 0.25rem;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
        gap: 0.5rem;
    }

    button.modal-confirmation-control {
        background: var(--default-color);
        width: 100%;
        height: 100%;
        border: none;
    }

    @supports ((-webkit-backdrop-filter: blur(2rem)) or (backdrop-filter: blur(2rem))) {
        .modal {
            background-color: var(--base-transition-1);
            backdrop-filter: blur(2rem);
        }
    }
</style>