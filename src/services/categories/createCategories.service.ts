import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import {
  iCategories,
  iCategoriesReturn,
} from "../../interfaces/categories.interface";
import { returnCategoriesSchema } from "../../schemas/categories.schema";

const createCategoriesService = async (
  categoriesData: iCategories
): Promise<iCategoriesReturn> => {
  const categoriesRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const newCategory = categoriesRepository.create(categoriesData);

  await categoriesRepository.save(newCategory);

  const returnCategory = returnCategoriesSchema.parse(newCategory);

  return returnCategory;
};

export { createCategoriesService };
