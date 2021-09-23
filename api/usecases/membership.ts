import MemberCollectionRepository from '@/api/repositories/membership'

export const createMembershipUseCase = async (
  projectId: string,
  userId: string
) => {
  const memberCollectionRepository = new MemberCollectionRepository()
  return await memberCollectionRepository.createMembership(projectId, userId)
}
