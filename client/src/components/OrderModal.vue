<template>
    <div class="order-modal">
        <div class="order-modal__inner">
            <section v-if="step == 1">
                <p>Select a Date</p>
                <div class="order-modal__body order-modal__body--first" v-if="filmSchedule">
                    <button v-for="item in filmSchedule" @click.stop="() => {selectedHall = item; step++}">
                        <p>{{ parseDateFunc(item.time) }}</p>
                        <span>{{ item.hall_id }} зал</span>
                    </button>
                    <p v-if="!filmSchedule.length">Фильма нет в прокате</p>
                </div>
            </section>
            <section v-if="step == 2">
                <p>Select a seats</p>
                <div class="order-modal__body order-modal__body--second">
                    <Hall :seats="filmSeats" v-if="filmSeats"/>
                </div>
            </section>
            <section v-if="step == 3">
                <form @submit.prevent="() => {createOrder(userInfo); step++}">
                    <fieldset>
                        <input type="text" placeholder="Имя" v-model="userInfo.name" required/>
                        <input type="email" placeholder="Почта" v-model="userInfo.email" required/>
                    </fieldset>
                    <fieldset>
                        <input type="text" placeholder="Телефон" v-model="userInfo.phone" required/>
                        <input type="text" placeholder="Промокод" v-model="userInfo.promo" />
                    </fieldset>
                    <ButtonUI white>Create order</ButtonUI>
                </form>
            </section>
            <section v-if="step == 4">
                <p>Заказ успешно оформлен!</p>
            </section>
            <template v-if="step < 4">
                <button class="order-modal__btn order-modal__btn--prev" @click="() => {--step}" v-show="showBtn(false)">
                    <img src="../assets/img/svg/arrow-left.svg" />
                </button>
                <div class="order-modal__steps">{{ step }}/3</div>
                <button class="order-modal__btn order-modal__btn--next" @click="() => {step++}" v-show="showBtn(true)">
                    <img src="../assets/img/svg/arrow-left.svg" />
                </button>
            </template>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { parseDate } from '@/helpers/utils'
import Hall from '@/components/Hall'

export default {
    name: 'OrderModal',
    props: {
        cinemaId: Number
    },
    components: {
        Hall
    },
    data() {
        return {
            step: 1,
            filmId: null,
            selectedHall: null,
            userInfo: {
                name: '',
                email: '',
                phone: '',
                promo: ''
            }
        }
    },
    watch: {
        step(newStep, oldStep) {
            if (newStep == 2) {
                this.newHallDate(this.selectedHall);
                this.fetchHallSeats(this.selectedHall.hall_id);
            }
        }
    },
    mounted() {
        this.filmId = Number(this.$route.params.id);
        this.fetchSchedule([this.filmId, this.cinemaId]);

        document.addEventListener('click', e => {            
            if (!e.target.closest(['.order-modal__inner', 'li']))
                this.$emit('closeOrder')
        })
    },
    methods: {
        ...mapActions({
            fetchSchedule: 'order/fetchFilmSchedule',
            fetchHallSeats: 'order/fetchHallSeats',
            createOrder: 'order/createOrder',
            newHallDate: 'order/newHallDate'
        }),
        parseDateFunc(date) {
            return parseDate(date);
        },
        selectDate(hallId) {
            this.fetchHallSeats(hallId);
            this.step++;
        },
        showBtn(isNext) {
            if (isNext) {
                return this.step < 3 && this.seatIsSelected
            } else {
                return this.step > 1
            }
        }
    },
    computed: {
        ...mapGetters({
            filmSchedule: 'order/getFilmSchedule',
            filmSeats: 'order/getFilmSeats',
            selectedSeat: 'order/getSelectedSeat',
        }),
        seatIsSelected() {
            return this.selectedSeat.column && this.selectedSeat.row
        }
    }
}
</script>

<style lang="sass" scoped>
.order-modal
    display: flex
    justify-content: center
    align-items: center

    &__inner
        position: relative
        padding: 30px 40px
        max-height: 90vh 
        max-width: 90vw
        overflow: auto
        background: $black
        border-radius: 10px
        display: flex
        flex-direction: column
        align-items: center
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)

        &::-webkit-scrollbar
            width: 12px
            
        &::-webkit-scrollbar-track
            background: $black
            border-radius: 20px
    
        &::-webkit-scrollbar-thumb 
            background-color: $white
            border-radius: 20px
            border: 3px solid $black

        & section
            width: 100%
            & > p
                font-size: 36px
                font-weight: 500
                margin-bottom: 60px

    &__body
        &--first
            display: flex
            flex-wrap: wrap
            column-gap: 12px
            row-gap: 15px
            width: 705px
            & button
                padding: 7px 15px
                border: 1px solid $white
                border-radius: 10px
                color: $white
                display: flex
                flex-direction: column
                align-items: center
                aspect-ratio: 1/.67
                transition: $trs
                cursor: pointer
                &:hover
                    background: $white
                    color: $black
                & p
                    font-size: 16px
                    font-weight: 600
                    white-space: nowrap
                & span
                    font-size: 11px
                    opacity: .8

    &__steps
        margin-top: 33px
        font-size: 20px
        font-weight: 500

    &__btn
        position: absolute
        bottom: 30px
        cursor: pointer
        transition: $trs opacity

        &:hover
            opacity: .7

        &--prev 
            left: 40px

        &--next
            right: 40px
            & img
                transform: rotate(180deg)

    & form
        display: flex
        flex-direction: column
        gap: 20px

        & fieldset
            display: flex
            gap: 47px

        & input
            padding: 13px 20px
            border: 1px solid $white
            border-radius: 10px
            font-size: 16px
            font-weight: 500
            color: $white
            &::placeholder
                color: rgba($white, .8)

        & .btn
            margin-left: auto
            margin-right: 0
            width: 45%

</style>