import { z } from "zod";

const categoriesSchema = z.object({
  name: z.string().max(45),
});

const returnCategoriesSchema = categoriesSchema.extend({
  id: z.number(),
});

export { categoriesSchema, returnCategoriesSchema };
