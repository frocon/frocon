import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class MemberCollectionRepository {
  async findByProjetId(projectId: string) {
    return await prisma.membership.findMany({
      where: {
        projectId,
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }
}
