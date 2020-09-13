<template>
    <div>
        <router-link to="/about">Go to About page</router-link>
        <users-list :users="users"></users-list>
        Locale: {{ xlocale }}
    </div>
</template>

<script>
    import Locale from '../../store/modules/Locale.js';
    import {mapGetters} from 'vuex';
    import UsersList from './components/users-list/index.vue';


    export default {
        name: 'Home',
        metaInfo: {
            title: 'Vue SSR Simple Setup Home',
            meta: [
                { name: 'description', content: 'Home page description' }
            ]
        },
        components: {
            UsersList,
        },
        computed: {
            users() {
                return this.$store.getters.users;
            },
            xlocale() {
                return this.$store.getters.getLocale;
            }
        },
        // Server-side only
        // This will be called by the server renderer automatically
        serverPrefetch () {
            // return the Promise from the action
            // so that the component waits before rendering
            this.$store.registerModule('Locale', Locale);
            return this.getUsers();
        },
        // Client-side only
        // beforeMount() {
        //     this.$store.registerModule('Locale', Locale, { preserveState: true });
        // },
        mounted () {alert('bm home');
            this.$store.registerModule('Locale', Locale, { preserveState: true });
            // If we didn't already do it on the server, we fetch the users
            if (!this.users.length) {
                this.getUsers();
            }
        },
        methods: {
            getUsers () {
                return this.$store.dispatch('getUsers');
            }
        },
        destroyed() {alert('destroyed home');
          this.$store.unregisterModule('Locale');
        },



    };
</script>
