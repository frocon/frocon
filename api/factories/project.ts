import { Project } from '../entities/project'
import { Program, ProgramCollection } from '../entities/program'
import { Role, Member, MemberCollection } from '../entities/member'

type ProjectWithMembersAndProgramsFactoryParams = {
  project: {
    id: string
    name: string | null
    updatedAt: Date
  }
  programs: Array<{
    id: string
    name: string | null
    source: string | null
    updatedAt: Date
  }>
  members: Array<{
    id: string
    userId: string
    role: string
  }>
}

const projectWithMembersAndProgramsFactory = (
  params: ProjectWithMembersAndProgramsFactoryParams
): Project => {
  const project = new Project(
    params.project.id,
    params.project.name,
    params.project.updatedAt
  )

  const programs = params.programs.map((program) => {
    return new Program(program.id, program.name, null, program.updatedAt)
  })

  const programCollection = new ProgramCollection(programs)
  project.setProgramCollection(programCollection)

  const members = params.members.map((member) => {
    return new Member(
      member.id,
      member.userId,
      null,
      Role[member.role as keyof typeof Role]
    )
  })
  const memberCollection = new MemberCollection(members)
  project.setMemberCollection(memberCollection)

  return project
}

type ProjectWithMembersFactoryParams = {
  id: string
  name: string
  updatedAt: Date
  members: Array<{
    id: string
    userId: string
    role: string
  }>
}

const projectWithMembersFactory = (
  projectWithMembers: ProjectWithMembersFactoryParams
) => {
  const project = new Project(
    projectWithMembers.id,
    projectWithMembers.name,
    projectWithMembers.updatedAt
  )
  const members = projectWithMembers.members.map((member) => {
    return new Member(
      member.id,
      member.userId,
      null,
      Role[member.role as keyof typeof Role]
    )
  })
  const memberCollection = new MemberCollection(members)
  project.setMemberCollection(memberCollection)
  return project
}
export { projectWithMembersAndProgramsFactory, projectWithMembersFactory }
