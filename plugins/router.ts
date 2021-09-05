import { auth } from '@/infrastructures/firebase'
import { Plugin, Context } from '@nuxt/types'

const routerPlugin: Plugin = (context: Context) => {
  context.app.router!.beforeEach(async (to, from, next) => {
    const currentUser = await auth.currentUser
    console.log(currentUser)
    if (to.path !== '/login' && !currentUser) {
      next({ path: '/login' })
    } else {
      next()
    }
  })
}

export default routerPlugin
