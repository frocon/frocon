import { PrismaClient } from '@prisma/client'
import { Role } from '../entities/member'

const prisma = new PrismaClient()

export default class ProjectRepository {
  async createWithInitialMember(name: string, userId: string) {
    return await prisma.project.create({
      data: {
        name,
        members: {
          create: [
            {
              userId,
              role: Role.Admin,
            },
          ],
        },
      },
    })
  }

  async findById(projectId: string) {
    return await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        tags: {
          select: {
            name: true,
          },
        },
        programs: {
          select: {
            id: true,
            name: true,
            updatedAt: true,
          },
        },
      },
    })
  }
}
