import { hash } from "bcryptjs";

import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/user.intefaces";

type CreatedUser = Omit<IUserRequest, "password">;

const createUserService = async ({
  email,
  age,
  name,
  password,
}: IUserRequest): Promise<CreatedUser> => {
  const userRepository = AppDataSource.getRepository(Users);

  const users = await userRepository.find();
  const exists = users.find((user) => user.email === email);

  if (exists) {
    throw new AppError("Email already in use");
  }

  if (!password) {
    throw new AppError("Password is a required field");
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    age,
    password: hashedPassword,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await userRepository.save(user);

  const { password: PWD, ...created } = user;

  return created;
};

export default createUserService;
