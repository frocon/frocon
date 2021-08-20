import { MemberCollection } from './member'
import { ProgramCollection } from './program'

export class Project {
  id: string
  name: string | null
  memberCollection?: MemberCollection
  programCollection?: ProgramCollection
  updatedAt: Date

  constructor(id: string, name: string | null, updatedAt: Date) {
    this.id = id
    this.name = name
    this.updatedAt = updatedAt
  }

  setMemberCollection(memberCollection: MemberCollection) {
    this.memberCollection = memberCollection
  }

  setProgramCollection(programCollection: ProgramCollection) {
    this.programCollection = programCollection
  }
}
