export class Program {
  id: string
  name: string | null
  source: string | null
  updatedAt: Date

  constructor(
    id: string,
    name: string | null,
    source: string | null,
    updatedAt: Date
  ) {
    this.id = id
    this.name = name
    this.source = source
    this.updatedAt = updatedAt
  }
}

export class ProgramCollection {
  programs: Program[]

  constructor(programs: Program[]) {
    this.programs = programs
  }
}
