import { Context, Middleware } from '@nuxt/types'
import firebase from 'firebase'

const authMiddleware: Middleware = ({ app, route, redirect }: Context) => {
  const unsubscribe = app.$fire.auth.onAuthStateChanged(
    (user: firebase.User) => {
      if (!user) return redirect('/login')
      if (route.path === '/login') return redirect('/')
    }
  )
  unsubscribe()
}

export default authMiddleware
