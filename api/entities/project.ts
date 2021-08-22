import { MemberCollection } from './member'
import { User } from './user'
import { ProgramCollection } from './program'
import { ProjectRepositoryInterface } from './interface'
import { ValidationError } from './error'

export class Project {
  id: string
  name: string | null
  memberCollection?: MemberCollection
  programCollection?: ProgramCollection
  updatedAt?: Date
  projectRepository?: ProjectRepositoryInterface

  constructor(
    id: string,
    name: string | null,
    updatedAt?: Date,
    projectRepository?: ProjectRepositoryInterface
  ) {
    this.id = id
    this.name = name
    this.updatedAt = updatedAt

    if (projectRepository) this.projectRepository = projectRepository
  }

  setMemberCollection(memberCollection: MemberCollection) {
    this.memberCollection = memberCollection
  }

  setProgramCollection(programCollection: ProgramCollection) {
    this.programCollection = programCollection
  }

  update(name: string, user: User): void {
    if (!this.projectRepository) throw new Error('memberCollectionが必要です')

    if (!this.memberCollection.isAdminMember(user))
      throw new ValidationError('権限がありません')
    if (name.length === 0) throw new ValidationError('名前が空です')

    if (this.projectRepository) {
      this.projectRepository.update(this.id, name).then(({ updatedAt }) => {
        if (updatedAt) this.updatedAt = updatedAt
      })
      this.name = name
    }
  }

  delete(user: User) {
    if (!this.memberCollection) throw new Error('memberCollectionが必要です')

    if (!this.memberCollection.isAdminMember(user))
      throw new ValidationError('権限がありません')
    if (this.projectRepository) this.projectRepository.delete(this.id)
  }
}
