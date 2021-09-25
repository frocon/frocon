import { PrismaClient } from '@prisma/client'
// import { v4 as uuidv4 } from 'uuid'
import { Role } from '../entities/member'
import { ProjectRepositoryInterface } from '../entities/interface'
import { Project } from '../entities/project'
import {
  projectWithMembersFactory,
  projectWithMembersAndProgramsFactory,
} from '../factories/project'

const prisma = new PrismaClient({ rejectOnNotFound: true })

export default class ProjectRepository implements ProjectRepositoryInterface {
  async getJoinedProjects(userId: string) {
    return await prisma.project.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: true,
        tags: true,
      },
    })
  }

  async update(id: string, name: string) {
    return await prisma.project.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })
  }

  async delete(id: string) {
    await prisma.project.delete({
      where: {
        id,
      },
    })
  }

  async createWithInitialMember(name: string, userId: string) {
    return await prisma.project.create({
      data: {
        name,
        members: {
          create: [
            {
              userId,
              role: Role.Admin,
            },
          ],
        },
        programs: {
          create: [
            {
              source: '',
              name: 'main',
            },
          ],
        },
      },
    })
  }

  async findById(projectId: string) {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    })

    return new Project(project.id, project.name, project.updatedAt)
  }

  async findWithTagsAndProgramsById(projectId: string) {
    return await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        tags: {
          select: {
            name: true,
          },
        },
        programs: {
          select: {
            id: true,
            name: true,
            updatedAt: true,
          },
        },
        members: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
            role: true,
          },
        },
      },
    })
  }

  async findWithMembers(id: string) {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        members: true,
      },
    })

    const members = project.members.map((member) => {
      return { id: member.id, userId: member.userId, role: member.role }
    })

    return projectWithMembersFactory({
      id: project.id,
      name: project.name,
      updatedAt: project.updatedAt,
      members,
    })
  }

  async findWithMembersAndPrograms(id: string) {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        members: true,
        programs: true,
      },
    })

    return projectWithMembersAndProgramsFactory({
      project,
      members: project.members,
      programs: project.programs,
    })
  }
}
