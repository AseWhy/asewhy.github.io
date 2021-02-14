<template>
    <div class="common-info">
        <h1> Статистика </h1>

        <table>
            <tr>
                <td> Количество уникальных посетителей за сутки </td>
                <td> {{ visitors ? visitors : 'Pending...' }} </td>
            </tr>
        </table>

        <h1> Список сообщений </h1>

        <div class="orders">
            <div class="mask" v-if="orders != nell && orders.length != 0">
                <div class="order-container" v-for="(order, index) in orders" :key="order.id + '.' + index">
                    <h2> {{ order.header }} 
                        <span class='created_at'> от {{ (new Date(order.created_at)).toLocaleString() }} </span> 
                    </h2>

                    <div class="order-body" v-html="marked(order.body)"></div>

                    <p class="sender-data">
                        <span class='from'> {{ order.from_name }} </span>
                        <span class='mail'> {{ order.from_email }} </span>
                    </p>
                    <hr>
                </div>
            </div>
            <p v-else> Кажется сообщений нет... </p>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { AdminApi } from '@/data/scripts/main';
    import marked from 'marked';

    export default {
        name: 'v-main-page',

        data(){
            return {
                visitors: false,
                orders: false
            }
        },

        methods: { 
            marked
        },

        computed: mapGetters([ 'adminData' ]),

        async mounted(){
            this.$data.visitors = await AdminApi.fetchVisitors();
            this.$data.orders = await AdminApi.fetchOrders();
        }
    }
</script>

<style>
    .sender-data > span {
        font-family: monospace;
    }

    .sender-data > span:first-child { 
        color: var(--cyan);
    }

    .sender-data > span:last-child { 
        color: var(--green);
    }

    .orders, .common-info {
        padding: 0.5rem;
    }

    .order-body {
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        background-color: var(--default-dirty-color);
        border-radius: 0.5rem;
        margin-top: 0.25rem;
    }

    .order-container > h2 {
        font-family: monospace;
        margin: 0;
    }

    span.created_at {
        font-size: small;
        color: var(--cyan);
    }
</style>