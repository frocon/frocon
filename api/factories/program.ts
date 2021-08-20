import { Program } from '../entities/program'
import readProgramFile from '../infrastructures/program_file'

type ProgramFactoryParameter = {
  id: string
  name: string | null
  updatedAt: Date
  path: string | null
}

const programFactory = ({
  id,
  name,
  updatedAt,
  path,
}: ProgramFactoryParameter) => {
  const source = path ? readProgramFile(path) : null
  return new Program(id, name, source, updatedAt)
}

export default programFactory
