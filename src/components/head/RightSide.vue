<template>
    <div class="rightside">
        <div class="admin-enter" v-if="adminData.active">
            <div class="check-access" v-if="adminData.access === 0">
                Получение доступа к админ панели...
            </div>
            
            <div class="check-access" v-if="adminData.access === 1">
                <div class="page-allow" v-if="!adminData.panel" v-on:click="activeAdminMode()">
                    Войти в панель
                </div>
                <div class="page-on" v-else>
                    Вы на панели управления!
                </div>
            </div>

            <div class="check-access" v-if="adminData.access === 2">
                Доступ к админ панели запрещен.
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        methods: mapActions([ 'activeAdminMode', 'fetchAdminAccess' ]),

        computed: mapGetters([ 'adminData' ]),

        mounted() {
            if(this.adminData.active) {
                this.fetchAdminAccess();
            }
        }
    }
</script>

<style>
    .admin-enter {
        padding: 0.5rem;
        background: var(--sub-color);
        width: fit-content;
        margin-top: auto;
        margin-left: auto;
    }

    .admin-enter * {
        color: var(--default-color);
    }

    .rightside {
        display: flex;
        padding: 0.25rem;
    }
</style>