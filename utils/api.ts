import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $axios: NuxtAxiosInstance // eslint-disable-line import/no-mutable-exports

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance
}

export { $axios }
