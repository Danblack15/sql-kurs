<template>
    <div class="booking-list" v-if="bookingList">
        <div v-for="booking in bookingList" :key="booking.id" class="booking-list__item">
            <p class="booking-list__title">{{ booking.title }}</p>
            <p>Дата: {{ parseDateFunc(booking.time) }}</p>
            <p>Кинотеатр {{ booking.cinema_title }}</p>
            <p>Длительность: {{ booking.duration }}</p>
            <p>{{ booking.row }} ряд, {{ booking.column }} место</p>
            <img :src="booking.poster" />
        </div>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex'
import { parseDate } from '@/helpers/utils'

export default {
    name: 'BookingList',
    async mounted() {
        this.fetchBookingList();
    },
    methods: {
        ...mapActions({
            fetchBookingList: 'user/userBooking'
        }),
        parseDateFunc(data) {
            return parseDate(data);
        }
    },
    computed: {
        ...mapGetters({
            bookingList: 'user/getBookingList'
        })
    },
}
</script>
  
<style lang="sass">
.booking-list
    display: flex
    flex-direction: column
    gap: 30px

    &__item
        position: relative
        width: 100%
        padding: 20px
        border: 1px solid $white
        border-radius: 10px
        display: grid
        grid-template-columns: 1fr 1fr
        gap: 30px
        overflow: hidden

        & img
            position: absolute
            top: 0
            left: 0
            width: 50%
            height: 100%
            object-fit: cover
            z-index: -1
            opacity: .2

        & p
            font-size: 20px

    &__title
        font-size: 24px !important
        font-weight: 600
</style>