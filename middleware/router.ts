import { Context } from '@nuxt/types'
import { userStore } from '@/store'

export default function (context: Context) {
  context.app.router!.beforeEach((to, _from, next) => {
    if (to.path !== '/login' && !userStore.isLogin) {
      next({ path: '/login' })
    } else {
      next()
    }
  })
}
