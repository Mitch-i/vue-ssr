<template>
    <div>
        <router-link to="/">Go to Home page</router-link>
        <h1>About page</h1>
        {{ locale }}
    </div>
</template>

<script>
    import Locale from '../../store/modules/Locale.js';

    export default {
        name: 'About',
        metaInfo: {
            title: 'Vue SSR Simple Setup About',
            meta: [
                { name: 'description', content: 'About page description' }
            ]
        },
        computed: {
            locale() {
                return this.$store.getters.getLocale;
            }
        },
        mounted() {alert('bm home');
            this.$store.registerModule('Locale', Locale, { preserveState: true });
        },
        destroyed() {alert('destroyed home');
            this.$store.unregisterModule('Locale');
        },
         serverPrefetch () {
            this.$store.registerModule('Locale', Locale);
        },
    };
</script>
