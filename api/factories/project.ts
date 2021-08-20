import { Project } from '../entities/project'
import { Program, ProgramCollection } from '../entities/program'

type ProjectWithProgramFactoryParams = {
  project: {
    id: string
    name: string | null
    updatedAt: Date
  }
  programs: Array<{
    id: string
    name: string | null
    route: string | null
    updatedAt: Date
  }>
}

const projectWithProgramFactory = (
  params: ProjectWithProgramFactoryParams
): Project => {
  const project = new Project(
    params.project.id,
    params.project.name,
    params.project.updatedAt
  )

  const programs: Program[] = []

  params.programs.forEach((program, _) => {
    programs.push(
      new Program(program.id, program.name, null, program.updatedAt)
    )
  })

  const programCollection = new ProgramCollection(programs)
  project.setProgramCollection(programCollection)

  return project
}

export { projectWithProgramFactory }
