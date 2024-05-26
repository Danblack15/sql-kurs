import api from '@/helpers/api';

export const Cinema = {
    state: () => ({
        allCinema: null,
    }),

    getters: {
        getAllCinema(state) {
            return state.allFilms;
        },
    },

    mutations: {
        setCinema(state, films) {
            state.allFilms = films;
        },
    },

    actions: {
        async fetchAllCinema({ commit }) {
            try {
                const res = await api.get('/cinema');

                commit('setCinema', res.data);
            } catch (error) {
                console.log(error);
            }
        },
    },

    namespaced: true,
}
