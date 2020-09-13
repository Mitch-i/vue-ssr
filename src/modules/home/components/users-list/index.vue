<template>
    <div>
        {{ locale }}
        <ul>
            <li v-for="user in users">{{user.name}} {{user.lastname}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'UsersList',
        props: {
            users: {
                type: Array,
                required: true
            }
        },
        computed: {
            locale() {
                return this.$store.getters.getLocale;
            }
        }
    };
</script>
