import { Plugin } from '@nuxt/types'
import { initializeAxios } from '~/utils/api'

export const accessor: Plugin = ({ $axios, store }): void => {
  initializeAxios($axios, store)
}

export default accessor
