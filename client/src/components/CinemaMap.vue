<template>
    <div class="cinema-map" id="cinema-map">
        
    </div>
</template>

<script>
import ymaps from 'ymaps';
import { parseCoords } from '@/helpers/utils'

export default {
    name: 'CinemaMap',
    props: {
        cinemaList: Array
    },
    data() {
        return {

        }
    },
    async mounted() {
        ymaps
            .load()
            .then(maps => {
                const startCoord = parseCoords(this.cinemaList[0].coords)
                const map = new maps.Map('cinema-map', {
                    center: [startCoord.lat, startCoord.long],
                    zoom: 7
                });

                this.cinemaList?.forEach(cinema => {
                    const coords = parseCoords(cinema.coords)
                    let placemark = new maps.Placemark([coords.lat, coords.long], 
                        { iconContent: cinema.title }, 
                        { preset: 'islands#darkOrangeStretchyIcon' });

                    map.geoObjects.add(placemark); 
                });
            })
            .catch(error => console.log('Failed to load Yandex Maps', error));
    },
    methods: {
        
    }
}
</script>

<style lang="sass" scoped>
.cinema-map
    width: 100%
    height: auto
    aspect-ratio: 1/.81
    
</style>