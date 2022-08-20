import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUserRequest } from "../../interfaces/user.intefaces";

const editUserService = async (
  id: string,
  { email, age, name }: IUserRequest
) => {
  const userRepository = AppDataSource.getRepository(Users);

  const users = await userRepository.find();

  const account = users.find((user) => user.id === id);

  !!name && (await userRepository.update(account!.id, { name }));
  !!email && (await userRepository.update(account!.id, { email }));
  !!age && (await userRepository.update(account!.id, { age }));

  if (!!name || !!email || !!age) {
    await userRepository.update(account!.id, { updated_at: new Date() });
  }

  const updatedUsers = await userRepository.find();

  const update = updatedUsers.find((user) => user.id === id);

  const { password, ...updated } = update!;

  return updated;
};

export default editUserService;
