import api from '@/helpers/api';

export const User = {
    state: () => ({
        bookingList: null
    }),

    getters: {
        getBookingList(state) {
            return state.bookingList;
        }
    },

    mutations: {
        setBookingList(state, data) {
            state.bookingList = data;
        } 
    },

    actions: {
        async userBooking({ commit, state }) {
            try {
                const userData = JSON.parse(localStorage.getItem('user_data'));
                
                if (!userData)
                    throw new Error('Данные пользователя не найдены')

                const data = {
                    user_id: userData.id
                };

                const res = await api.post('/user/booking', data);

                commit('setBookingList', res.data);
            } catch (error) {
                console.log(error);
            }
        }
    },

    namespaced: true,
}
