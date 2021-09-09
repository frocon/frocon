import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  rejectOnNotFound: true,
})

export default class UserRepository {
  async update(id: string, name: string, email: string, avatar: string) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        avatar,
      },
    })
  }

  async delete(id: string) {
    return await prisma.user.delete({
      where: {
        id,
      },
    })
  }

  async createNewUser(
    name: string,
    email: string,
    avatar: string | null,
    firebaseIdToken: string
  ) {
    return await prisma.user.create({
      data: {
        name,
        email,
        avatar,
        firebaseIdToken,
      },
    })
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        email: true,
        avatar: true,
        joinedProjects: {
          select: {
            id: true,
            updatedAt: true,
            projectId: true,
            role: true,
          },
        },
        likeProjects: {
          select: {
            id: true,
            name: true,
            updatedAt: true,
          },
        },
      },
    })
  }

  async findByIdToken(idToken: string) {
    return await prisma.user.findUnique({
      where: {
        firebaseIdToken: idToken,
      },
    })
  }
}
