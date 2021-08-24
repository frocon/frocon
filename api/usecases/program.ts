import ProgramRepository from '../repositories/program'
import ProjectRepository from '../repositories/project'
import UserRepository from '../repositories/user'

const getProgramUseCase = async (id: string) => {
  const programRepository = new ProgramRepository()
  return await programRepository.findById(id)
}

const createProgramUseCase = async (projectId: string, name: string) => {
  const projectRepository = new ProjectRepository()
  const userRepository = new UserRepository()
  const project = await projectRepository.findWithMembers(projectId)
  const loginUser = await userRepository.findLoginUser()
  return await project.createProgram(name, loginUser)
}

export { getProgramUseCase, createProgramUseCase }
