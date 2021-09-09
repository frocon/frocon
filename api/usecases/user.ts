import UserRepository from '../repositories/user'
import ProjectRepository from '../repositories/project'

const getUserUseCase = async (id: string) => {
  const projectRepository = new UserRepository()
  return await projectRepository.findById(id)
}

const createUserUseCase = async (project: { name: string }) => {
  const userRepository = new UserRepository()
  const projectRepository = new ProjectRepository()

  const loginUser = await userRepository.findLoginUser()
  if (loginUser !== null) {
    return await projectRepository.createWithInitialMember(
      project.name,
      loginUser.id
    )
  }
}

export { getUserUseCase, createUserUseCase }
