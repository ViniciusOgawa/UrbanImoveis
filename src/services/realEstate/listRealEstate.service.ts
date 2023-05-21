import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { iRealEstateReturnArray } from "../../interfaces/realEstate.interface";

const listRealEstateService = async (): Promise<iRealEstateReturnArray> => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
  
    const realEstates: Array<RealEstate> = await realEstateRepository.find({
        relations:{
            address: true
        }
    });

    return realEstates

};

export { listRealEstateService }