export enum Role {
  Admin = 'admin',
  General = 'general',
}

export class Member {
  id: string
  name: string
  role: Role

  constructor(id: string, name: string, role: Role) {
    this.id = id
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
    return this.members.some((member) => member.role === Role.Admin)
  }
}
