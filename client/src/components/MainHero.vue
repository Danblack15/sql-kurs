<template>
    <div class="main-hero">
        <div class="main-hero__slide main-hero__slide--one" v-if="oneFilm">
            <img :src="oneFilm.poster" />
            <div class="main-hero__text">
                <h2>{{ oneFilm.title }}</h2>
                <p>{{ oneFilm.description }}</p>
            </div>
        </div>

        <div class="swiper main-hero__swiper" v-if="allFilms && !oneFilm">
            <div class="swiper-wrapper main-hero__swiper-wrapper">
                <div class="swiper-slide main-hero__slide" v-for="film in allFilms.slice(3)" :key="film.id">
                    <img :src="film.poster" />
                    <div class="main-hero__text">
                        <h2>{{ film.title }}</h2>
                        <p>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam.</p>
                        <ButtonUI>Watch now</ButtonUI>
                    </div>
                </div>
            </div>
            <div class="swiper-pagination main-hero__pagination"></div>
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
    name: 'MainHero',
    props: {
        oneFilm: Object
    },
    async mounted() {
        if (this.oneFilm) return;

        await this.fetchAllFilms();

        new Swiper('.main-hero__swiper', {
            modules: [Pagination],
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
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
.main-hero 
    height: 60vh

    &__swiper
        height: 100%

    &__slide
        display: flex
        align-items: center
        padding-left: 160px
        box-sizing: border-box

        &::after
            content: ''
            display: block
            width: 100%
            height: 100%
            position: absolute
            top: 0
            left: 0
            background: rgba($black, .6)
            z-index: -1
            
        & img
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            object-fit: cover
            z-index: -1

        &--one
            position: relative
            width: 100%
            height: auto
            min-height: 530px
            padding-top: 120px
            padding-bottom: 30px

    &__pagination
        width: auto !important
        left: 50% !important
        bottom: 35px !important
        transform: translateX(-50%)
        display: inline-flex
        gap: 10px

        .swiper-pagination-bullet
            margin: 0 !important
            background: $white
            opacity: .6
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)

            &.swiper-pagination-bullet-active
                opacity: 1

    &__text
        position: relative
        color: $white
        & h2
            font-size: 48px
            font-weight: 500
        & p
            margin: 20px 0
            font-size: 24px
            font-weight: 400
            max-width: 414px
        & .btn


</style>