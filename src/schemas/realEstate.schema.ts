import { z } from "zod";
import { addressSchema, returnAddressSchema } from "./address.schema";
import { returnCategoriesSchema } from "./categories.schema";

const realEstateSchema = z.object({
  sold: z.boolean().default(false),
  value: z.number().multipleOf(0.01).default(0).or(z.string()),
  size: z.number().int().positive(),
  categoryId: z.number().nullish(),
  address: addressSchema,
});

const returnRealEstateSchema = z.object({
  sold: z.boolean().default(false),
  value: z.number().multipleOf(0.01).default(0).or(z.string()),
  size: z.number().int().positive(),
  category: returnCategoriesSchema,
  address: returnAddressSchema,
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const returnRealEstateSchemaArray = returnRealEstateSchema.omit({
  category: true
}).array()

export { realEstateSchema, returnRealEstateSchema, returnRealEstateSchemaArray };
