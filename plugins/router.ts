import { Plugin, Context } from '@nuxt/types'
import { userStore } from '@/store'

const routerPlugin: Plugin = (context: Context) => {
  context.app.router!.beforeEach((to, _from, next) => {
    if (to.path !== '/login' && !userStore.isLogin) {
      next({ path: '/login' })
    } else {
      next()
    }
  })
}

export default routerPlugin
