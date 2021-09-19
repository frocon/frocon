import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { state } from '@/store'

let $axios: NuxtAxiosInstance // eslint-disable-line import/no-mutable-exports

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance
  $axios.interceptors.request.use(
    (config) => {
      const idToken = state().authUser!.uid
      if (idToken) config.headers.Authorization = idToken
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export { $axios }
