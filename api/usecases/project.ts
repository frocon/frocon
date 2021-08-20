import ProjectRepository from '../repositories/project'
import UserRepository from '../repositories/user'

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

export { createProjectUseCase }
