import { Context, Middleware } from '@nuxt/types'

const authMiddleware: Middleware = ({ store, route, redirect }: Context) => {
  if (!store.getters.isLoggedIn) return redirect('/login')
  if (route.path === '/login') return redirect('/')
}

export default authMiddleware
