<template>
    <header class="header container">
        <router-link to="/">Cinema</router-link>
        <div class="header__account">
            <router-link v-if="userData?.name" to="/account">{{ userData.name }}</router-link>
            <template v-else>
                <img src="../assets//img/svg/profile.svg" alt="profile" @click="loginModalIsOpen = !loginModalIsOpen"/>
                <LoginModal class="header__login-modal" v-if="loginModalIsOpen" />
            </template>
        </div>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';

import LoginModal from '@/components/LoginModal';

export default {
    name: 'HeaderBlock',
    components: {
        LoginModal
    },
    data() {
        return {
            loginModalIsOpen: false
        }
    },
    mounted() {
        document.addEventListener('click', e => {
            if (!e.target.closest('.header__account') && this.loginModalIsOpen)
                this.loginModalIsOpen = false
        });
    },
    computed: {
        ...mapGetters({
            userData: 'auth/getUserData'
        })
    }
}
</script>

<style lang="sass" scoped>
.header
    position: absolute
    top: 0
    left: 0
    width: 100%
    padding-top: 35px
    padding-bottom: 35px
    display: flex
    justify-content: space-between
    color: $white
    z-index: 10

    & a
        font-family: "Kaushan Script", cursive
        font-size: 32px
        color: $white

    &__account
        position: relative

        & img
            cursor: pointer
            transition: $trs opacity

            &:hover
                opacity: .5

    &__login-modal
        position: absolute
        bottom: 0
        right: 0
        transform: translateY(100%)

</style>