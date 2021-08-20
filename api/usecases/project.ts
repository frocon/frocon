import ProjectRepository from '../repositories/project'
import UserRepository from '../repositories/user'

const getProjectUseCase = async (id: string) => {
  const projectRepository = new ProjectRepository()
  return await projectRepository.findById(id)
}

const createProjectUseCase = async (project: { name: string }) => {
  const projectRepository = new ProjectRepository()
  const userRepository = new UserRepository()

  const loginUser = await userRepository.findLoginUser()
  if (loginUser !== null) {
    return await projectRepository.createWithInitialMember(
      project.name,
      loginUser.id
    )
  }
}

export { getProjectUseCase, createProjectUseCase }
