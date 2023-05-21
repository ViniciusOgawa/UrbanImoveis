import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../errors";

const listRealEstateSchedulesService = async (realEstateId: number) => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const realEstate = await realEstateRepository.findOne({
        where:{
            id: realEstateId
        }
    });

    if(!realEstate){
        throw new AppError("RealEstate not found", 404);
    }

    const realEstates = await realEstateRepository.findOne({
        where:{
            id: realEstateId
        },
        relations:{
            address:true,
            schedules:{
                user:true
            },
            category:true
        }
    });

    return realEstates;

};

export { listRealEstateSchedulesService }