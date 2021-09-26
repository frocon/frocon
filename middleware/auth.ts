import { Context, Middleware } from '@nuxt/types'

const authMiddleware: Middleware = ({ store, route, redirect }: Context) => {
  if (
    !store.getters.isLoggedIn &&
    route.path !== '/signup' &&
    route.path !== '/login'
  )
    return redirect('/login')
  if (
    store.getters.isLoggedIn &&
    (route.path === '/login' || route.path === '/signup')
  )
    return redirect('/')
}

export default authMiddleware
