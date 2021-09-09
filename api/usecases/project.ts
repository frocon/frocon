import ProjectRepository from '../repositories/project'
import UserRepository from '../repositories/user'

export type ProjectsWithMembersAndTags = {
  id: string
  name: string
  updatedAt: Date
  members: {
    userId: string
    role: string
  }[]
  tags: {
    id: string
    name: string
  }[]
}[]

const getProjectsUseCase = async (
  userIdToken: string
): Promise<[string, ProjectsWithMembersAndTags]> => {
  const projectRepository = new ProjectRepository()
  const userRepository = new UserRepository()

  const loginUser = await userRepository.findByIdToken(userIdToken)
  const projects = await projectRepository.getJoinedProjects(loginUser.id)
  return [loginUser.id, projects]
}

const getProjectUseCase = async (id: string) => {
  const projectRepository = new ProjectRepository()
  return await projectRepository.findWithTagsAndProgramsById(id)
}

const createProjectUseCase = async (name: string, userIdToken: string) => {
  const projectRepository = new ProjectRepository()
  const userRepository = new UserRepository()

  const loginUser = await userRepository.findByIdToken(userIdToken)
  return await projectRepository.createWithInitialMember(name, loginUser.id)
}

const updateProjectUseCase = async (
  id: string,
  name: string,
  userIdToken: string
) => {
  const projectRepository = new ProjectRepository()
  const project = await projectRepository.findWithMembers(id)
  const userRepository = new UserRepository()

  const loginUser = await userRepository.findByIdToken(userIdToken)
  await project.update(name, loginUser)
  return project
}

export {
  getProjectsUseCase,
  getProjectUseCase,
  createProjectUseCase,
  updateProjectUseCase,
}
