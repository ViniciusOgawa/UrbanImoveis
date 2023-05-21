import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

const ensureUserExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const findUser: User | null =  await userRepository.findOne({
        where: {
            id: +req.params.id
        }
    })

    if(!findUser){
        throw new AppError("User not found", 404);
    }

    return next();

}

export { ensureUserExists }