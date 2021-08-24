import { PrismaClient } from '@prisma/client'
import programFactory from '../factories/program'
import { ProgramRepositoryInterface } from '../entities/interface'

const prisma = new PrismaClient({ rejectOnNotFound: true })

export default class ProgramRepository implements ProgramRepositoryInterface {
  async findById(id: string) {
    const program = await prisma.program.findUnique({
      where: {
        id,
      },
    })

    return programFactory(program)
  }

  async create(projectId: string, name: string) {
    const program = await prisma.program.create({
      data: {
        name,
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    })

    if (program.name === null) throw new Error('Program.nameが存在しません')

    return { id: program.id, name: program.name!, updatedAt: program.updatedAt }
  }
}
