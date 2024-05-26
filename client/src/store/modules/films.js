import api from '@/helpers/api';

export const Films = {
    state: () => ({
        allFilms: null,
        film: null
    }),

    getters: {
        getAllFilms(state) {
            return state.allFilms;
        },
        getFilm(state) {
            return state.film;
        }
    },

    mutations: {
        setFilms(state, films) {
            state.allFilms = films;
        },
        setFilm(state, film) {
            state.film = film;
        }
    },

    actions: {
        async fetchAllFilms({ commit }) {
            try {
                const res = await api.get('/film');

                commit('setFilms', res.data);
            } catch (error) {
                console.log(error);
            }
        },
        async fetchOneFilm({ state, commit }, id) {
            state.film = null;
            
            try {
                const res = await api.get('/film/' + id);

                commit('setFilm', res.data);
            } catch (error) {
                console.log(error);
            }
        }
    },

    namespaced: true,
}
