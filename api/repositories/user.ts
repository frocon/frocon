import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class UserRepository {
	async createWithInitialMember(name: string, userId: string) {
		return await prisma.user.create({
			data: {
				name,
			},
		})
	}

  async findLoginUser() {
    return await prisma.user.findFirst({ orderBy: { id: 'asc' } })
  }

	async findById(userId: string) {
    return await prisma.user.findUnique({
			where: {
					id: userId,
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
}
