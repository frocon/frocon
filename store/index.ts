// @ts-nocheck

export const state = () => ({
  authUser: null,
})

type State = ReturnType<typeof state>

export const getters = {
  isLoggedIn: (state: State) => !!state.authUser,
}

export const actions = {
  async onAuthStateChanged({ commit }, { authUser, claims }) {
    if (!authUser) {
      await this.$router.push('/login')
      commit('RESET_STORE')
      return
    }

    if (authUser && claims) {
      await this.$router.push('/profile')
    }

    commit('SET_USER', { authUser, claims })
  },

  async nuxtServerInit({ dispatch }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, ...authUser } = res.locals.user

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      })
    }
  },
}

export const mutations = {
  RESET_STORE(state: State) {
    state.authUser = null
  },
  SET_USER(state: State, { authUser, claims }) {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
      emailVerified: authUser.emailVerified,
      displayName: authUser.displayName,
      photoURL: claims.picture,
      isAdmin: claims.admin,
    }
  },
}
