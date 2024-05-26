<template>
    <div class="account container">
        <div class="account__inner">
            <div class="account__main-info">
                <p>Daniil</p>
                <a href="#">+7915846258</a>
                <a href="#">mail@test.com</a>
            </div>
            <section class="account__content">
                <div class="account__bts">
                    <ButtonUI 
                        @click="activeTab = 'booking'" 
                        :white="isBooking" 
                        :disabled="isBooking"
                    >booking</ButtonUI>
                    <ButtonUI 
                        @click="activeTab = 'reviews'"
                        :white="!isBooking" 
                        :disabled="!isBooking"
                    >reviews</ButtonUI>
                </div>
                <div class="account__tabs">
                    <BookingList class="account__tab account__tab--booking" v-if="isBooking"/>
                    <div class="account__tab account__tab--reviews" v-else>
                        reviews
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import BookingList from '@/components/BookingList'

export default {
    name: 'Account',
    components: {
        BookingList
    },
    data() {
        return {
            activeTab: 'booking'
        }
    },
    computed: {
        isBooking() {
            return this.activeTab === 'booking';
        },
    }
}
</script>

<style lang="sass" scoped>
.account
    padding-bottom: 270px

    &__inner
        margin-top: 147px
        display: flex
        align-items: flex-start
        gap: 90px

    &__main-info
        position: sticky
        top: 20px
        display: flex
        flex-direction: column
        gap: 15px
        padding: 20px
        border: 1px solid $white
        border-radius: 10px

        & p
            font-size: 36px
            font-weight: 500

        & a
            font-size: 16px
            color: $white
            transition: $trs opacity
            &:hover
                opacity: .5

    &__bts
        display: flex
        gap: 15px
        .btn
            padding: 14px 56px
            border: none

    &__tabs
        margin-top: 40px

    &__content
        width: 100%

</style>
