import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $axios: NuxtAxiosInstance // eslint-disable-line import/no-mutable-exports

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance
  $axios.interceptors.request.use(
    (config) => {
      const idToken = localStorage.getItem('access_token')
      if (idToken) config.headers.Authorization = idToken
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export { $axios }
