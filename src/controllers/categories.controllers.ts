import { Request, Response } from "express";
import {
  iCategories,
  iCategoriesReturn,
} from "../interfaces/categories.interface";
import { createCategoriesService } from "../services/categories/createCategories.service";
import { listCategoriesService } from "../services/categories/listCategories.service";
import { listRealEstateByCategoryService } from "../services/categories/listRealEstateByCategory.service";

const createCategoriesController = async (req: Request, res: Response) => {
  const categoriesData: iCategories = req.body;

  const newCategories: iCategoriesReturn = await createCategoriesService(
    categoriesData
  );

  return res.status(201).json(newCategories);
};

const listCategoriesController = async (req: Request, res: Response) => {

  const categories = await listCategoriesService();
    
  return res.json(categories)

}

const listRealEstateByCategoryController = async (req: Request, res: Response) => {

  const realEstates = await listRealEstateByCategoryService(+req.params.id)

  return res.status(200).json(realEstates);

}

export { createCategoriesController, listCategoriesController, listRealEstateByCategoryController };
