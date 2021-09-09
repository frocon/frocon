import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as signOutByFirebase,
} from 'firebase/auth'
import firebaseConfig from './firebaseConfig.json'

initializeApp(firebaseConfig)

const auth = getAuth()

const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
}

const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

const signOut = async () => {
  await signOutByFirebase(auth)
}

export { signUp, signIn, signOut, auth }
