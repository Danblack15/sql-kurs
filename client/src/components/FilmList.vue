<template>
    <div class="film-list">
        <h2 class="container" v-if="heading?.length">{{ heading }}</h2>
        <div class="swiper film-list__slider" v-if="allFilms">
            <div class="swiper-wrapper container">
                <router-link 
                    v-for="film in allFilms" 
                    :to="`/film/${film.id}`" 
                    class="swiper-slide film-list__slide" 
                    :key="film.id"
                >
                    <img :src="film.poster" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

// Swiper Styles
import 'swiper/css'
import 'swiper/css/pagination'

export default {
    name: 'FilmList',
    props: {
        heading: {
            type: String,
            default: ''
        }
    },
    async mounted() {
        if (!this.allFilms)
            await this.fetchAllFilms();

        new Swiper('.film-list__slider', {
            modules: [Pagination],
            slidesPerView: 'auto',
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            spaceBetween: 30,
            observer: true,
        })
    },
    methods: {
        ...mapActions({
            fetchAllFilms: 'films/fetchAllFilms'
        })
    },
    computed: {
        ...mapGetters({
            allFilms: 'films/getAllFilms'
        }),
    }
}
</script>

<style lang="sass" scoped>
.film-list
    & h2
        font-size: 36px
        font-weight: 500

    &__slider 
        margin-top: 30px

    &__slide
        position: relative
        aspect-ratio: 1
        width: auto !important
        min-width: 240px
        box-sizing: border-box
        &:hover
            &::after
                background: transparent
        &::after
            content: ''
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            background: rgba($black, .3)
            transition: $trs background
        & img
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            object-fit: cover


</style>