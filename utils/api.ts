import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { userStore } from '@/store'

let $axios: NuxtAxiosInstance // eslint-disable-line import/no-mutable-exports

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance
  $axios.interceptors.request.use(
    (config) => {
      const uid = userStore.uid
      if (uid) config.headers.Authorization = uid
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export { $axios }
