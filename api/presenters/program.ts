import { Program } from '../entities/program'

const programDetailPresenter = (program: Program) => {
  return {
    id: program.id,
    name: program.name,
    source: program.source,
    updatedAt: program.updatedAt,
  }
}

const programUpdateNamePresenter = (program: Program) => {
  return {
    id: program.id,
    name: program.name,
    updatedAt: program.updatedAt,
  }
}

const programUpdateSourcePresenter = (program: Program) => {
  return {
    id: program.id,
    source: program.source,
    updatedAt: program.updatedAt,
  }
}

export {
  programDetailPresenter,
  programUpdateNamePresenter,
  programUpdateSourcePresenter,
}
