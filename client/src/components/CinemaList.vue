<template>
    <div class="cinema-list">
        <h2>Select a Cinema</h2>
        <div class="cinema-list__wrapper">
            <ul class="cinema-list__body">
                <li v-for="cinema in allCinema" :key="cinema.id" @click="openOrder(cinema.id, true)">
                    <img :src="cinema.image" />
                    <div class="cinema-list__info">
                        <p>{{ cinema.title }}</p>
                    </div>
                </li>
            </ul>
            <div class="cinema-list__map" v-if="allFilms">
                <CinemaMap :cinemaList="allCinema" />
            </div>
        </div>
        <OrderModal 
            :cinemaId="cinemaId" 
            class="cinema-list__order-modal" 
            v-if="orderModalIsOpen"
            @closeOrder="closeOrder"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CinemaMap from '@/components/CinemaMap'
import OrderModal from '@/components/OrderModal'

export default {
    name: 'CinemaList',
    components: {
        CinemaMap,
        OrderModal
    },
    data() {
        return {
            orderModalIsOpen: false,
            cinemaId: null
        }
    },
    async mounted() {
        if (!this.allFilms)
            await this.fetchAllFilms();

        this.fetchAllCinema();
    },
    methods: {
        ...mapActions({
            fetchAllFilms: 'films/fetchAllFilms',
            fetchAllCinema: 'cinema/fetchAllCinema'
        }),
        openOrder(id) {
            this.cinemaId = id;
            this.orderModalIsOpen = true;
        },
        closeOrder() {
            if (this.orderModalIsOpen)
                this.orderModalIsOpen = false
        }
    },
    computed: {
        ...mapGetters({
            allFilms: 'films/getAllFilms',
            allCinema: 'cinema/getAllCinema'
        })
    }
}
</script>

<style lang="sass" scoped>
.cinema-list
    & h2
        font-size: 36px
        font-weight: 500

    &__wrapper
        margin-top: 40px
        display: flex
        gap: 50px


    &__body
        width: 40%
        display: flex
        flex-direction: column
        gap: 30px

        & li
            position: relative
            aspect-ratio: 1/.56
            display: block
            width: 100%
            height: 100%
            cursor: pointer
            
            &:hover
                .cinema-list__info
                    opacity: 1

            & img
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                object-fit: cover

    &__info
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        color: $white
        background: rgba($black, .5)
        display: flex
        justify-content: center
        align-items: center
        font-size: 36px
        font-weight: 500
        opacity: 0
        transition: $trs opacity

    &__map
        width: 60%
        height: 100%
        position: sticky
        top: 30px

    &__order-modal
        position: fixed
        top: 0
        left: 0
        width: 100vw
        height: 100vh
        background: rgba($black, .7)
        backdrop-filter: blur(5px)
        z-index: 10
        
</style>