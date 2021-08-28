import { Program } from './program'

export interface ProjectRepositoryInterface {
  update: (
    id: string,
    name: string
  ) => Promise<{ name: string; updatedAt: Date }>
  delete: (id: string) => Promise<void>
}

export interface ProgramRepositoryInterface {
  create: (projectId: string, name: string) => Promise<Program>

  updateName: (programId: string, name: string) => Promise<Program>

  updateSource: (programId: string, source: string) => Promise<Program>
}
