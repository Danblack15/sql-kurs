import api from '@/helpers/api';

export const Order = {
    state: () => ({
        cinema: null,
        filmId: null,
        cinemaFilmId: null,
        filmSchedule: null,
        filmSeats: null,
        selectedSeat: {
            column: null,
            row: null
        },
        hallDate: null,
        userData: JSON.parse(localStorage.getItem('user_data')) || null
    }),

    getters: {
        getFilmSchedule(state) {
            return state.filmSchedule;
        },
        getFilmSeats(state) {
            return state.filmSeats;
        },
        getSelectedSeat(state) {
            return state.selectedSeat
        }
    },

    mutations: {
        setCinema(state, value) {
            state.cinema = value;
        },
        setFilmId(state, value) {
            state.filmId = value;
        },
        setFilmSchedule(state, schedule) {
            state.filmSchedule = schedule;
        },
        setFilmSeats(state, seatsData) {
            state.filmSeats = seatsData;
        },
        setSelectedSeat(state, seatData) {
            state.selectedSeat = {
                column: seatData[0],
                row: seatData[1]
            }
        },
        setNewHallDate(state, date) {
            state.hallDate = date.time;
            state.cinemaFilmId = date.id;
        },
        clearOrder(state) {
            state.cinema = null;
            state.cinemaFilmId = null;
            state.filmSchedule = null;
            state.filmSeats = null;
            state.selectedSeat = {
                column: null,
                row: null
            },
            state.hallDate = null;
        }
    },

    actions: {
        async fetchFilmSchedule({ commit }, schduleData) {
            commit('setFilmSchedule', null);
            try {
                const data = {
                    film_id: schduleData[0],
                    cinema_id: schduleData[1]
                }

                const res = await api.post('/film/schedule', data);

                commit('setCinema', data.cinema_id);
                commit('setFilmId', data.film_id);
                commit('setFilmSchedule', res.data);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchHallSeats({ commit, state }, hallId) {
            commit('setFilmSeats', null);
            try {
                const data = {
                    hall_id: hallId,
                    cinema_film_id: state.cinemaFilmId
                }
                const res = await api.post('/oneHall', data);
                commit('setFilmSeats', res.data);
            } catch (error) {
                console.log(error);
            }
        },
        newSelectedSeat({ commit }, seatData) {
            commit('setSelectedSeat', seatData)
        },
        newHallDate({ commit }, date) {
            commit('setNewHallDate', date);
        },
        async createOrder({ commit, state }, userInfo) {
            try {
                const hallDate = new Date(state.hallDate);
                const data = {
                    film_cinema_id: state.cinemaFilmId,
                    hall_id: state.filmSeats.hall.id, 
                    user_id: state.userData.id, 
                    cinema_id: state.filmSeats.hall.cinema_id, 
                    column: state.selectedSeat.column, 
                    row: state.selectedSeat.row, 
                    time: hallDate.toISOString().split('T')[0], 
                    name: userInfo.name, 
                    phone: userInfo.phone, 
                    email: userInfo.email, 
                    status: "current"
                }

                const res = await api.post('/booking', data);

                commit('clearOrder');
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
    },

    namespaced: true,
}
