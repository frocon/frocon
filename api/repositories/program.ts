import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class ProgramRepository {
  async findByProjectAndProgramId(id: string) {
    return await prisma.program.findUnique({
      where: {
        id,
      },
    })
  }
}
