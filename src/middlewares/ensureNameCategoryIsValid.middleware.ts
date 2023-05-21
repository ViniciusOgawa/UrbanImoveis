import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address, Category } from "../entities";
import { AppError } from "../errors";

const ensureNameCategoryIsValid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

    const findCategory =  await categoryRepository.findOne({
        where: {
            name: req.body.name
        }
    })

    if(findCategory){
        throw new AppError("Category already exists", 409);
    }

    return next();

}

export { ensureNameCategoryIsValid }