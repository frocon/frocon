import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Store } from 'vuex'

let $axios: NuxtAxiosInstance // eslint-disable-line import/no-mutable-exports

export function initializeAxios(
  axiosInstance: NuxtAxiosInstance,
  store: Store<any>
) {
  $axios = axiosInstance
  $axios.interceptors.request.use(
    (config) => {
      const idToken = store.getters.authUser.idToken
      if (idToken) config.headers.Authorization = idToken
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export { $axios }
