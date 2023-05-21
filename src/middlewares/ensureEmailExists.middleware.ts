import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

const ensureEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser: User | null = await userRepository.findOne({
    where: {
      email: req.body.email
    },
    withDeleted: true
  });

  if (findUser?.email === req.body.email) {
    throw new AppError("Email already exists", 409);
  };

  return next();
};

export { ensureEmailExists };