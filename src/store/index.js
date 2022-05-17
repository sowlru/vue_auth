import { createStore, createLogger } from 'vuex'
// import { store } from '../store'
import auth from './modules/auth.module'

const plugins = []
if(process.env.NODE_ENV == 'development') {
  plugins.push(createLogger)
} 

export default createStore({
  plugins,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: { auth }
})
