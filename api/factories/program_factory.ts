import readProgramFile from '../services/program_file'
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
  if (path != null) {
    const source = readProgramFile(path)
    return {
      id,
      name,
      source,
      updatedAt,
    }
  }
}

export default programFactory
