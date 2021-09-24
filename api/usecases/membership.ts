import MemberCollectionRepository from '../repositories/membership'
import UserRepository from '../repositories/user'

export const createMembershipUseCase = async (
  projectId: string,
  email: string
) => {
  const memberCollectionRepository = new MemberCollectionRepository()
  const userRepository = new UserRepository()
  const user = await userRepository.findByEmail(email)
  const userId = user.id
  return await memberCollectionRepository.createMembership(projectId, userId)
}
