export interface ProjectRepositoryInterface {
  update: (
    id: string,
    name: string
  ) => Promise<{ name: string; updatedAt: Date }>
  delete: (id: string) => Promise<void>
}
