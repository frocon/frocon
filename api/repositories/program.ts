import { PrismaClient } from '@prisma/client'
import { ProgramRepositoryInterface } from '../entities/interface'
import { Program } from '../entities/program'

const prisma = new PrismaClient({ rejectOnNotFound: true })

export default class ProgramRepository implements ProgramRepositoryInterface {
  async findById(id: string) {
    const program = await prisma.program.findUnique({
      where: {
        id,
      },
    })

    const source = program.source === null ? '' : program.source
    return new Program(program.id, program.name, source, program.updatedAt)
  }

  async create(projectId: string, name: string) {
    const program = await prisma.program.create({
      data: {
        name,
        source: '',
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    })

    if (program.name === null) throw new Error('Program.nameが存在しません')

    return new Program(program.id, program.name, '', program.updatedAt)
  }

  async updateName(programId: string, name: string) {
    const program = await prisma.program.update({
      where: {
        id: programId,
      },
      data: {
        name,
      },
    })
    return new Program(program.id, program.name, null, program.updatedAt)
  }

  async updateSource(programId: string, source: string) {
    const program = await prisma.program.findUnique({
      where: {
        id: programId,
      },
    })

    const { updatedAt } = await prisma.program.update({
      where: {
        id: programId,
      },
      data: {
        updatedAt: new Date(),
        source,
      },
    })

    return new Program(program.id, program.name, source, updatedAt)
  }
}
