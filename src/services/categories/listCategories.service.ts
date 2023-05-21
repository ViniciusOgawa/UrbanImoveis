import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { returnCategoriesSchema } from "../../schemas/categories.schema";

const listCategoriesService = async () => {

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);
  
    const findCategory: Array<Category> = await categoryRepository.find()
  
    return findCategory;

};

export { listCategoriesService }

