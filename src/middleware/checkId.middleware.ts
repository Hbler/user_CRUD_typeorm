import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../entities/users.entity";

export const checkIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id) {
    throw new Error("Missing param: id");
  }

  const userRepository = AppDataSource.getRepository(Users);

  const users = await userRepository.find();

  const account = users.find((user) => user.id === id);

  if (!account) {
    res.status(404).json({
      message: "User not found",
    });
  }

  next();
};
