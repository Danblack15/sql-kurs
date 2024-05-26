<template>
	<div class="home">
		<MainHero />
		<FilmList heading="All Films" class="home__film-list" />
	</div>
</template>

<script>
import MainHero from '@/components/MainHero'
import FilmList from '@/components/FilmList'

export default {
	name: 'HomeView',
	components: {
		MainHero,
		FilmList
	}
}
</script>

<style lang="sass" scoped>
.home
	padding-bottom: 270px
	
	&__film-list
		margin-top: 60px
</style>
