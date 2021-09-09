import UserRepository from '../repositories/user'

const getUserUseCase = async (id: string) => {
  const projectRepository = new UserRepository()
  return await projectRepository.findById(id)
}

const createUserUseCase = async (email: string, firebaseIdToken: string) => {
  const userRepository = new UserRepository()

  return await userRepository.createNewUser(email, firebaseIdToken)
}

const updateUserUseCase = async (
  name: string | null,
  avatar: string | null,
  userIdToken: string
) => {
  const userRepository = new UserRepository()

  return await userRepository.update(name, avatar, userIdToken)
}

export { getUserUseCase, createUserUseCase, updateUserUseCase }
