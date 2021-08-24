import ProjectRepository from '../repositories/project'
import ProgramRepository from '../repositories/program'
import { MemberCollection } from './member'
import { User } from './user'
import { Program, ProgramCollection } from './program'
import {
  ProjectRepositoryInterface,
  ProgramRepositoryInterface,
} from './interface'
import { ValidationError, PermissionError } from './error'

export class Project {
  id: string
  name: string | null
  memberCollection?: MemberCollection
  programCollection?: ProgramCollection
  updatedAt?: Date
  projectRepository: ProjectRepositoryInterface
  programRepository: ProgramRepositoryInterface

  constructor(id: string, name: string | null, updatedAt?: Date) {
    this.id = id
    this.name = name
    this.updatedAt = updatedAt
    this.projectRepository = new ProjectRepository()
    this.programRepository = new ProgramRepository()
  }

  setMemberCollection(memberCollection: MemberCollection) {
    this.memberCollection = memberCollection
  }

  setProgramCollection(programCollection: ProgramCollection) {
    this.programCollection = programCollection
  }

  async update(name: string, user: User) {
    if (!this.memberCollection) throw new Error('memberCollectionが必要です')

    if (!this.memberCollection.isAdminMember(user))
      throw new PermissionError('権限がありません')
    if (name.length === 0) throw new ValidationError('名前が空です')

    const { updatedAt } = await this.projectRepository.update(this.id, name)
    this.name = name
    this.updatedAt = updatedAt
  }

  delete(user: User) {
    if (!this.memberCollection) throw new Error('memberCollectionが必要です')

    if (!this.memberCollection.isAdminMember(user))
      throw new PermissionError('権限がありません')

    this.projectRepository.delete(this.id)
  }

  async createProgram(name: string, user: User) {
    if (!this.memberCollection) throw new Error('memberCollectionが必要です')
    if (!this.programCollection) throw new Error('programCollectionが必要です')

    if (!this.memberCollection.isMember(user))
      throw new PermissionError('権限がありません')

    if (this.programCollection.isSameNameProgramExist(name))
      throw new ValidationError('同じ名前のプログラムが存在しています')
    const program = await this.programRepository.create(this.id, name)
    return new Program(program.id, program.name, null, program.updatedAt)
  }
}
