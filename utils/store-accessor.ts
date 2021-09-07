import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import UserModule from '~/store/user'

let userStore: UserModule // eslint-disable-line import/no-mutable-exports

// ストアを初期化する関数。rootのstoreを受け取って、モジュールを初期化する
function initialiseStores(store: Store<any>): void {
  // userStoreはここで初期化。
  userStore = getModule(UserModule, store)
}

export { initialiseStores, userStore }
