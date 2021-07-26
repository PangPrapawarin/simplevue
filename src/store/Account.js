import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import Information from '@/json/begin.json'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
        type: {
            allIncome: 0,
            allExpense: 0,
        }
    },
    getters: {
        allData: (state) => state.data,
        allIncome: (state) => state.type.allIncome,
        allExpense: (state) => state.type.allExpense
    },
    mutations: {
        fetch(state, { res }) {
            state.data = res
        },
        add(state, { payload }) {
            state.data.push(payload)
        },
        edit(state, { payload }) {
            state.data[payload.index].income = payload.income
            state.data[payload.index].expense = payload.expense
            state.data[payload.index].dateTime = payload.dateTime
            state.data[payload.index].sum = payload.sum
            state.data[payload.index].note = payload.note
        }
    },
    actions: {
        editData({ commit }, payload) {
            commit('edit', { payload })
        },
        fetchData({ commit }) {
            let res = Information
            commit('fetch', { res })
        },
        addData({ commit }, payload) {
            commit('add', { payload })
        }
    },
    modules: {}
})