import { PrismaClient } from '@prisma/client'
import { Role } from '../entities/member'

const prisma = new PrismaClient({ rejectOnNotFound: true })

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

  async createMembership(projectId: string, userId: string) {
    return await prisma.membership.create({
      data: {
        role: Role.General,
        user: {
          connect: {
            id: userId,
          },
        },
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    })
  }
}
