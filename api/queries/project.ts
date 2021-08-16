import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const projectDetailQuery = async (projectId: string) => {
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
      members: {
        select: {
          role: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })
}

export default projectDetailQuery
