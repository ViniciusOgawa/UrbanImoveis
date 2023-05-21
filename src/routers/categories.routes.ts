import { Router } from "express";
import { createCategoriesController, listCategoriesController, listRealEstateByCategoryController } from "../controllers/categories.controllers";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid.middleware";
import { ensureNameCategoryIsValid } from "../middlewares/ensureNameCategoryIsValid.middleware";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin.middleware";
import { categoriesSchema } from "../schemas/categories.schema";

const categoriesRoutes: Router = Router();

categoriesRoutes.post("", ensureTokenIsValid, ensureUserIsAdmin, ensureDataIsValid(categoriesSchema), ensureNameCategoryIsValid ,createCategoriesController);
categoriesRoutes.get("/:id/realEstate", listRealEstateByCategoryController);
categoriesRoutes.get("", listCategoriesController)

export { categoriesRoutes };
