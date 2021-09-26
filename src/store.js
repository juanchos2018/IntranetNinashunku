import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
    //estoy usando este de aqui
const state = {
    sidebarShow: 'responsive',
    sidebarMinimize: true,
    //  url_base: 'http://localhost/apiphp/',
    tipousuario: '',
    id_usuario: '',
    url_base: 'https://phpapi.identidadesjuveniles.org/',

}



export default new Vuex.Store({
    state,
    mutations: {
        toggleSidebarDesktop(state) {
            const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
            state.sidebarShow = sidebarOpened ? false : 'responsive'
        },
        toggleSidebarMobile(state) {
            const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
            state.sidebarShow = sidebarClosed ? true : 'responsive'
        },
        set(state, [variable, value]) {
            state[variable] = value
        },
        settipousuario(state, tipousuario) {
            state.tipousuario = tipousuario
        },
        setIdUsuario(state, id_usuario) {
            state.id_usuario = id_usuario
        },
    },
    actions: {
        guardarIdUsuario({ commit }, id_usuario) {
            commit("setIdUsuario", id_usuario)
            localStorage.setItem("id_usuario", id_usuario)
        },
        guardarTipoUsuario({ commit }, tiposusuario) {
            commit("settipousuario", tiposusuario)
            localStorage.setItem("tipousuario", tiposusuario)
        },

    }
})

// export default new Vuex.Store({
//     state,
//     mutations
// })