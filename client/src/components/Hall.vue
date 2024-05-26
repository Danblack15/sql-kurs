<template>
    <div class="hall">
        <div class="hall__screen">
            <p>Screen</p>
        </div>
        <div :class="['hall__body', {'hall__body--big': isBigHall}]">
            <div class="hall__row">
                <div class="hall__seat hall__seat--number" v-for="column in seats.hall.columns + 1">{{ column - 1 == 0 ? '' : column - 1 }}</div>
            </div>
            <div class="hall__row" v-for="row of seats.hall.rows" :key="row">
                <div class="hall__seat hall__seat--letter">{{ row }}</div>
                <div 
                    :class="['hall__seat', {
                        'hall__seat--busy': isBusy(column, row)
                    }]" 
                    v-for="column of seats.hall.columns" 
                    :key="row + column"
                >
                    <input 
                        type="radio" 
                        name="seat" 
                        :id="`${column}${row}`" 
                        :disabled="isBusy(column, row)" 
                        @change="selectSeat([column, row])"
                    />
                    <label :for="`${column}${row}`"></label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Hall',
    props: {
        seats: Object
    },
    data() {
        return {

        }
    },
    async mounted() {
        
    },
    methods: {
        isBusy(column, row) {
            const busySeats = this.seats.busySeats;

            return busySeats.filter(item => item.column == column && item.row == row).length !== 0;
        },
        ...mapActions({
            selectSeat: 'order/newSelectedSeat'
        })
    },
    computed: {
        isBigHall() {
            const { rows, columns } = this.seats.hall;

            return rows * columns >= 64
        }
    }
}
</script>

<style lang="sass" scoped>
.hall
    &__screen
        width: 100%
        border-bottom: 14px solid $grey-1
        text-align: center

        & p
            margin-bottom: 4px

    &__body
        margin-top: 40px
        &--big
            & label, .hall__seat--number, .hall__seat--letter
                width: 35px !important
            
            & .hall__row
                gap: 40px
                &:not(:first-child)
                    margin-top: 30px

    &__row
        display: flex
        align-items: center
        gap: 40px
        &:not(:first-child)
            margin-top: 40px

    &__seat
        &--number
            width: 70px
            aspect-ratio: 1
            display: flex
            justify-content: center
            align-items: center
            font-size: 36px
            font-weight: 500

        &--letter
            width: 70px
            aspect-ratio: 1
            display: flex
            justify-content: center
            align-items: center
            font-size: 36px
            font-weight: 500

        &--busy
            pointer-events: none
            & label
                background: $grey-1 !important

    & input
        display: none
        &:checked
            & ~ label
                background: $green

    & label
        display: block
        width: 70px
        aspect-ratio: 1
        border-radius: 10px
        background: $white
        cursor: pointer

        &:hover
            opacity: .8
</style>