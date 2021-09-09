import UserRepository from '../repositories/user'

const getUserUseCase = async (id: string) => {
  const projectRepository = new UserRepository()
  return await projectRepository.findById(id)
}

const createUserUseCase = async (user: {
  name: string
  email: string
  avatar: string | null
  firebaseIdToken: string
}) => {
  const userRepository = new UserRepository()

  return await userRepository.createNewUser(
    user.name,
    user.email,
    user.avatar,
    user.firebaseIdToken
  )
}

export { getUserUseCase, createUserUseCase }
