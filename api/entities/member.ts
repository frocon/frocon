import { User } from './user'

export enum Role {
  Admin = 'Admin',
  General = 'General',
}

export class Member {
  id: string
  userId: string
  name: string | null
  role: Role

  constructor(id: string, userId: string, name: string | null, role: Role) {
    this.id = id
    this.userId = userId
    this.name = name
    this.role = role
  }
}

export class MemberCollection {
  members: Member[]

  constructor(members: Member[]) {
    this.members = members
  }

  add(member: Member): boolean {
    if (!this.members.some((m) => m.id === member.id)) {
      this.members.push(member)
      return true
    }

    return false
  }

  delete(id: string): boolean {
    this.members.forEach((member, index) => {
      if (member.id === id) {
        const deleteMember = this.members[index]
        this.members.splice(index, 1)

        if (!this.isAdminMemberExist()) return true

        this.members.push(deleteMember)
      }
    })

    return false
  }

  isAdminMemberExist(): boolean {
    return this.members.some((member) => member.role == Role.Admin)
  }

  isAdminMember(user: User): boolean {
    return this.members.some((member, _) => member.userId === user.id && member.role == Role.Admin)
  }
}
