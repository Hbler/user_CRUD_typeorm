import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entity";

const getUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Users);

  const users = await userRepository.find();

  const account = users.find((user) => user.id === id);

  return account;
};

export default getUserService;
