import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entity";

type UserList = Omit<Users, "password">;

const listUsersService = async (): Promise<UserList[]> => {
  const userRepository = AppDataSource.getRepository(Users);

  const users = await userRepository.find();

  const noPWD = users.map((u) => {
    const { password, ...user } = u;
    return user;
  });

  return noPWD;
};

export default listUsersService;
