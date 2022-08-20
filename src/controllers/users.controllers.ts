import { Request, Response } from "express";
import { AppError } from "../errors/AppError";

import { IUserRequest } from "../interfaces/user.intefaces";

import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import editUserService from "../services/users/editUser.service";
import getUserService from "../services/users/getUser.service";
import listUsersService from "../services/users/listUsers.service";

export const createUserController = async (req: Request, res: Response) => {
  const { email, age, name, password }: IUserRequest = req.body;
  const user = await createUserService({ email, age, name, password });

  return res.status(201).json(user);
};

export const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();

  return res.status(200).json(users);
};

export const getUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const users = await getUserService(id);

  return res.status(200).json(users);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const users = await deleteUserService(id);

  return res.status(200).json({ message: "User successfully deleted" });
};

export const editUserController = async (req: Request, res: Response) => {
  const keys = Object.keys(req.body);

  if (keys.length === 0) {
    throw new AppError("Nothing to update");
  }

  const { email, age, name }: IUserRequest = req.body;
  const { id } = req.params;

  const user = await editUserService(id, { email, age, name });

  return res.status(200).json({ message: "User updated", user });
};
