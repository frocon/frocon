import * as admin from 'firebase-admin'
import * as Express from 'express'
import { AuthenticationError } from '../entities/error'
import serviceAccount from './serviceAccount.json'

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
}

/**
 * FirebaseのidTokenを検証する。検証成功すればuidを返す。
 */
const verifyIdToken = async (req: Express.Request) => {
  const idToken = req.header('authorization')
  if (!idToken)
    throw new AuthenticationError("Request header missing 'Authorization'")
  return await admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => decodedToken.uid)
    .catch(() => {
      throw new AuthenticationError('Failed to verify')
    })
}

export { verifyIdToken }
