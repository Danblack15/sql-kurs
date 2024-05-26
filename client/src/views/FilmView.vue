<template>
	<div class="film">
		<MainHero :oneFilm="film" v-if="film"/>
		<CinemaList class="film__cinema-list container" />
		<FilmList heading="Other Films" class="film__othre-films"/>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import MainHero from '@/components/MainHero'
import CinemaList from '@/components/CinemaList'
import FilmList from '@/components/FilmList'

export default {
	name: 'FilmViews',
	components: {
		MainHero,
		CinemaList,
		FilmList
	},
	beforeRouteUpdate(to, from, next) {
		this.fetchOneFilm(to.params.id)
		window.scrollTo(0, 0)
		next()
	},
	async mounted() {
		await this.fetchOneFilm(this.$route.params.id);
	},
	methods: {
		...mapActions({
			fetchOneFilm: 'films/fetchOneFilm'
		})
	},
	computed: {
		...mapGetters({
			film: 'films/getFilm'
		}),
	}
}
</script>

<style lang="sass" scoped>
.film
	padding-bottom: 270px

	.main-hero 
		height: auto
	
	&__cinema-list
		margin-top: 60px

	&__othre-films
		margin-top: 120px

</style>
