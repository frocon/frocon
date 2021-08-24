export interface ProjectRepositoryInterface {
  update: (
    id: string,
    name: string
  ) => Promise<{ name: string; updatedAt: Date }>
  delete: (id: string) => Promise<void>
}

export interface ProgramRepositoryInterface {
  create: (
    projectId: string,
    name: string
  ) => Promise<{ id: string; name: string; updatedAt: Date }>
}
