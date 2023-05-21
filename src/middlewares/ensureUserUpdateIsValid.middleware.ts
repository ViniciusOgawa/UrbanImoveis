import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const ensureUserUpdateIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authenticatedUser = req.user;
  const id = +req.params.id;

  if (authenticatedUser.admin === false) {
    if (id !== authenticatedUser.id) {
      throw new AppError("Insufficient permission", 403);
    }
  }

  return next();
};

export { ensureUserUpdateIsValid };