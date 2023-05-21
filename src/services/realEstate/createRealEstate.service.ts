import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import {
  iRealEstate,
  iRealEstateReturn,
} from "../../interfaces/realEstate.interface";
import { returnRealEstateSchema } from "../../schemas/realEstate.schema";

const createRealEstateService = async (
  realEstateData: iRealEstate
): Promise<iRealEstateReturn> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const adressesRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const categoriesRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const newAddress = adressesRepository.create(realEstateData.address);

  await adressesRepository.save(newAddress);

  let categories = null;

  if(realEstateData.categoryId){
    categories = await categoriesRepository.findOne({
        where: {
          id: realEstateData.categoryId,
        },
      });
  }

  if (!categories) {
    throw new AppError("Categories not exists", 404);
  }

  const realEstate: RealEstate = realEstateRepository.create({
    value: realEstateData.value,
    size: realEstateData.size,
    address: newAddress,
    sold: realEstateData.sold,
    category: categories,
  });

  await realEstateRepository.save(realEstate);

  const newRealEstate: iRealEstateReturn =
    returnRealEstateSchema.parse(realEstate);

  return newRealEstate;
};

export { createRealEstateService };
