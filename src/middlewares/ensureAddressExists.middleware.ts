import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address } from "../entities";
import { AppError } from "../errors";

const ensureAddressExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);

    const findAddress =  await addressRepository.findOne({
        where: {
            street: req.body.address.street,
            zipCode: req.body.address.zipCode,
            city: req.body.address.city,
            state: req.body.address.state
        }
    })

    console.log(findAddress)

    if(findAddress){
        throw new AppError("Address already exists", 409);
    }

    return next();

}

export { ensureAddressExists }