import api from '@/helpers/api';

export const Auth = {
    state: () => ({
        userData: JSON.parse(localStorage.getItem('user_data')) || null,
        error: ''
    }),

    getters: {
        getUserData(state) {
            return state.userData;
        },
        getError(state) {
            return state.error
        }
    },

    mutations: {
        setUserData(state, data) {
            state.userData = data;
        },
        setError(state, error) {
            state.error = error;
        } 
    },

    actions: {
        async login({ commit }, userName) {
            try {
                const data = {
                    user_name: userName
                }

                const res = await api.post('/login', data);

                if (res.data.length == 0) {
                    commit('setError', 'Пользователь не найден');
                    return;
                }

                localStorage.setItem('user_data', JSON.stringify(res.data));
                commit('setUserData', res.data);
            } catch (error) {
                console.log(error);
            }
        },
    },

    namespaced: true,
}
