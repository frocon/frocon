import { Project } from '../entities/project'
import { ProjectsWithMembersAndTags } from '../usecases/project'

const projectDetailPresenter = (project: Project) => {
  return {
    id: project.id,
    name: project.name,
    updatedAt: project.updatedAt,
  }
}

const projectsPresenter = (
  userId: string,
  projects: ProjectsWithMembersAndTags
) => {
  return projects.map((project) => {
    const role = project.members.find(
      (member) => member.userId === userId
    )!.role
    return {
      id: project.id,
      name: project.name,
      updatedAt: project.updatedAt,
      role,
      tags: project.tags,
    }
  })
}

export { projectDetailPresenter, projectsPresenter }
