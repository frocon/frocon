import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class UserRepository {
  // 未実装（現状最初のユーザーを返すようにしている)
  async findLoginUser() {
    return await prisma.user.findFirst({ orderBy: { id: 'asc' } })
  }
}
