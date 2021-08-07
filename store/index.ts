import { ActionTree, MutationTree } from 'vuex'

type RootState = {
  csrfToken: string
}

export const state = (): RootState => ({
  csrfToken: '',
})

export const mutations: MutationTree<RootState> = {
  SET_CSRF_TOKEN(state, csrfToken) {
    state.csrfToken = csrfToken
  },
}

export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit({ commit }, { req }) {
    if (req.cookies) {
      commit('SET_CSRF_TOKEN', req.csrfToken())
    }
  },
}
