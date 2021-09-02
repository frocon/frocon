import * as admin from 'firebase-admin'
import serviceAccount from './serviceAccount.json'

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

const verifyUser = async (idToken: string) => {
  const decodedToken = await admin.auth().verifyIdToken(idToken)
  return decodedToken
}

export { verifyUser }
