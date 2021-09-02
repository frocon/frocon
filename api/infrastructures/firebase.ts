import * as admin from 'firebase-admin'
import * as Express from 'express'
import serviceAccount from './serviceAccount.json'

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

/**
 * FirebaseのidTokenを検証する。検証成功すればuidを返す。
 */
const verifyIdToken = async (req: Express.Request) => {
  const idToken = req.header('Authorization')
  if (!idToken) return ''
  const { uid } = await admin.auth().verifyIdToken(idToken)
  return uid
}

export { verifyIdToken }
