import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";

const listRealEstateByCategoryService = async (categoryId: number) => {

    const categoriesRepository: Repository<Category> = AppDataSource.getRepository(Category);
  
    const category = await categoriesRepository.findOne({
        where:{
            id: categoryId
        }
    });

    if(!category){
        throw new AppError("Category not found", 404);
    }

    const categories: Category | null = await categoriesRepository.findOne({
        where:{
            id: categoryId
        },
        relations: {
            realEstate: true
        }
    });

    return categories;

};

export { listRealEstateByCategoryService }