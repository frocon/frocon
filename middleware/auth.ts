import { Context, Middleware } from '@nuxt/types'
import { auth } from '@/infrastructures/firebase'
import { onAuthStateChanged } from '@firebase/auth'

const authMiddleware: Middleware = ({ route, redirect }: Context) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (!user) return redirect('/login')
    if (route.path === '/login') return redirect('/')
  })
  unsubscribe()
}

export default authMiddleware
