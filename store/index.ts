import { Store } from 'vuex'
import { initialiseStores } from '~/utils/store-accessor'

// Vuexのプラグインを利用して初期化する
const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]

export * from '~/utils/store-accessor'
