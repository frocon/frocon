import * as admin from 'firebase-admin'
import * as Express from 'express'
import serviceAccount from './serviceAccount.json'

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

const verifyIdToken = async (req: Express.Request) => {
  const idToken = req.header('Authorization')
  if (!idToken) return new Error('Authorization does not exist in Header.')
  const { uid } = await admin.auth().verifyIdToken(idToken)
  return uid
}

export { verifyIdToken }
