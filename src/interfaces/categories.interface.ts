import { z } from "zod";
import {
  categoriesSchema,
  returnCategoriesSchema,
} from "../schemas/categories.schema";

type iCategories = z.infer<typeof categoriesSchema>;
type iCategoriesReturn = z.infer<typeof returnCategoriesSchema>;

export { iCategories, iCategoriesReturn };
