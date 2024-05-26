import { createStore } from 'vuex'

import { Films } from './modules/films'
import { Cinema } from './modules/cinema'
import { Order } from './modules/order'
import { Auth } from './modules/auth'
import { User } from './modules/user'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    films: Films,
    cinema: Cinema,
    order: Order,
    auth: Auth,
    user: User
  }
})
