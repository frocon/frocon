import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { ProgramRepositoryInterface } from '../entities/interface'
import { Program } from '../entities/program'
import { readSource, writeSource } from '../infrastructures/program'

const prisma = new PrismaClient({ rejectOnNotFound: true })

export default class ProgramRepository implements ProgramRepositoryInterface {
  async findById(id: string) {
    const program = await prisma.program.findUnique({
      where: {
        id,
      },
    })

    const source = program.path === null ? '' : readSource(program.path)
    return new Program(program.id, program.name, source, program.updatedAt)
  }

  async create(projectId: string, name: string) {
    const program = await prisma.program.create({
      data: {
        name,
        path: uuidv4(),
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

    if (program.path === null)
      throw new Error('Program.pathが初期化されていません')
    writeSource(program.path, source)

    const { updatedAt } = await prisma.program.update({
      where: {
        id: programId,
      },
      data: {
        updatedAt: new Date(),
      },
    })

    return new Program(program.id, program.name, source, updatedAt)
  }
}
