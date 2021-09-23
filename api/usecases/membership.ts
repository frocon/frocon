import MemberCollectionRepository from '../repositories/membership'

export const createMembershipUseCase = async (
  projectId: string,
  userId: string
) => {
  const memberCollectionRepository = new MemberCollectionRepository()
  return await memberCollectionRepository.createMembership(projectId, userId)
}
