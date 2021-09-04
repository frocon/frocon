import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { auth } from '@/infrastructures/firebase'

let $axios: NuxtAxiosInstance // eslint-disable-line import/no-mutable-exports

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance
  $axios.interceptors.request.use(
    async (config) => {
      const currentUser = await auth.currentUser
      if (currentUser)
        config.headers.Authorization = await currentUser.getIdToken()
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export { $axios }
