import { PrismaClient } from '@prisma/client'
import { User } from '../entities/user'

const prisma = new PrismaClient({
  rejectOnNotFound: true,
})

export default class UserRepository {
  async update(
    name: string | null,
    avatar: string | null,
    userIdToken: string
  ) {
    return await prisma.user.update({
      where: {
        firebaseIdToken: userIdToken,
      },
      data: {
        name,
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

  async createNewUser(email: string, firebaseIdToken: string) {
    return await prisma.user.create({
      data: {
        email,
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
    const user = await prisma.user.findUnique({
      where: {
        firebaseIdToken: idToken,
      },
    })
    const userEntity = new User(user.id, user.name, user.email)
    return userEntity
  }
}
