import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({ rejectOnNotFound: true })

export default class UserRepository {
  // 未実装（現状最初のユーザーを返すようにしている)
  async findByIdToken(idToken: string) {
    return await prisma.user.findUnique({
      where: {
        firebaseIdToken: idToken,
      },
    })
  }
}
