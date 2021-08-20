import { Program } from '../entities/program'

const programDetailPresenter = (program: Program) => {
  return {
    id: program.id,
    name: program.name,
    source: program.source,
    updatedAt: program.updatedAt,
  }
}

export { programDetailPresenter }
