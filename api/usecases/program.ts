import ProgramRepository from '../repositories/program'
import programFactory from '../factories/program'

const getProgramUseCase = async (id: string) => {
  const programRepository = new ProgramRepository()
  const queriedProgram = await programRepository.findByProjectAndProgramId(id)
  if (queriedProgram) {
    const program = programFactory(queriedProgram)
    return program
  }
}

export { getProgramUseCase }
