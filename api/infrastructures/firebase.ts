import * as admin from 'firebase-admin'
import * as Express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { AuthenticationError } from '../entities/error'
import serviceAccount from './serviceAccount.json'

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) }, uuidv4())

/**
 * FirebaseのidTokenを検証する。検証成功すればuidを返す。
 */
const verifyIdToken = async (req: Express.Request) => {
  const idToken = req.header('Authorization')
  if (!idToken) throw new AuthenticationError('Request header missing \'Authorization\'')
  return await admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => decodedToken.uid, () => { throw new AuthenticationError('Failed to verify')})
}

export { verifyIdToken }
