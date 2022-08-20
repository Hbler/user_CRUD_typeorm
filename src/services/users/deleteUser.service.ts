import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entity";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Users);

  const users = await userRepository.find();

  const account = users.find((user) => user.id === id);

  await userRepository.delete(account!.id);

  return true;
};

export default deleteUserService;
