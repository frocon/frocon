import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const programDetailQuery = async (programId: string) => {
  return await prisma.program.findUnique({
    where: {
      id: programId,
    },
    select: {
      id: true,
      name: true,
      path: true,
      updatedAt: true,
    },
  })
}

export default programDetailQuery
