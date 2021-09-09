import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

export interface UserState {
  uid: string | null
}

@Module({ stateFactory: true, namespaced: true, name: 'user' })
export default class UserModule extends VuexModule implements UserState {
  uid: string | null = null

  get isLogin(): boolean {
    return this.uid != null
  }

  @Mutation
  setUser(uid: string | null) {
    this.uid = uid
  }

  @Action
  login(uid: string | null) {
    this.setUser(uid)
  }
}
