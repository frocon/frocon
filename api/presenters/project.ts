import { Project } from '../entities/project'

const projectDetailPresenter = (project: Project) => {
  return {
    id: project.id,
    name: project.name,
    updatedAt: project.updatedAt,
  }
}

export { projectDetailPresenter }
