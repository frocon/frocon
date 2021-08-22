import { projectWithProgramFactory, projectWithMembersFactory } from '../factories/project'
import ProjectRepository from '../repositories/project'
import UserRepository from '../repositories/user'

const getProjectUseCase = async (id: string) => {
  const projectRepository = new ProjectRepository()
  return await projectRepository.findWithTagsAndProgramsById(id)
}

const createProjectUseCase = async (name: string) => {
  const projectRepository = new ProjectRepository()
  const userRepository = new UserRepository()

  const loginUser = await userRepository.findLoginUser()
  if (loginUser !== null) {
    return await projectRepository.createWithInitialMember(name, loginUser.id)
  }
}

const updateProjectUseCase = async (id: string, name: string) => {
  const projectRepository = new ProjectRepository()
  const projectWithMembers = await projectRepository.findWithMembers(id)
  if (projectWithMembers) {
    const project = projectWithMembersFactory(projectWithMembers, projectRepository)
    const userRepository = new UserRepository()

    const loginUser = await userRepository.findLoginUser()
    if (project && loginUser) {
      await project.update(name, loginUser)
      return project
    }
  }
}

export { getProjectUseCase, createProjectUseCase, updateProjectUseCase }
