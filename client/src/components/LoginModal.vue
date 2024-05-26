<template>
    <section class="login-modal">
        <p>Login</p>
        <form @submit.prevent="login(loginData)">
            <input type="text" placeholder="Логин" v-model="loginData" required/>
            <ButtonUI white>Login</ButtonUI>
            <span v-if="error">{{ error }}</span>
        </form>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'LolginMOdal',
    data() {
        return {
            loginData: ''
        }
    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        })
    },
    computed: {
        ...mapGetters({
            error: 'auth/getError'
        })
    }
}
</script>

<style lang="sass" scoped>
.login-modal
    background: $black
    border-radius: 10px
    padding: 30px

    & p
        font-size: 24px
        font-weight: 500

    & form
            margin-top: 20px
            display: flex
            flex-direction: column
            gap: 20px

            & input
                padding: 13px 20px
                border: 1px solid $white
                border-radius: 10px
                font-size: 16px
                font-weight: 500
                color: $white
                &::placeholder
                    color: rgba($white, .8)
</style>