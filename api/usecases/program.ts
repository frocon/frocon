import ProgramRepository from '../repositories/program'
import ProjectRepository from '../repositories/project'
import UserRepository from '../repositories/user'

const getProgramUseCase = async (id: string) => {
  const programRepository = new ProgramRepository()
  return await programRepository.findById(id)
}

const createProgramUseCase = async (
  projectId: string,
  name: string,
  userIdToken: string
) => {
  const projectRepository = new ProjectRepository()
  const userRepository = new UserRepository()
  const project = await projectRepository.findWithMembersAndPrograms(projectId)
  const loginUser = await userRepository.findByIdToken(userIdToken)
  return await project.createProgram(name, loginUser)
}

const updateProgramNameUseCase = async (
  projectId: string,
  programId: string,
  name: string,
  userIdToken: string
) => {
  const projectRepository = new ProjectRepository()
  const userRepository = new UserRepository()
  const project = await projectRepository.findWithMembersAndPrograms(projectId)
  const loginUser = await userRepository.findByIdToken(userIdToken)

  return await project.updateProgramName(programId, name, loginUser)
}

const updateProgramSourceUseCase = async (
  projectId: string,
  programId: string,
  source: string,
  userIdToken: string
) => {
  const projectRepository = new ProjectRepository()
  const userRepository = new UserRepository()
  const project = await projectRepository.findWithMembersAndPrograms(projectId)
  const loginUser = await userRepository.findByIdToken(userIdToken)

  return await project.updateProgramSource(programId, source, loginUser)
}

export {
  getProgramUseCase,
  createProgramUseCase,
  updateProgramNameUseCase,
  updateProgramSourceUseCase,
}
