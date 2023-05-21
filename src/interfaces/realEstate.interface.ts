import { z } from "zod";
import {
  realEstateSchema,
  returnRealEstateSchema,
  returnRealEstateSchemaArray,
} from "../schemas/realEstate.schema";

type iRealEstate = z.infer<typeof realEstateSchema>;
type iRealEstateReturn = z.infer<typeof returnRealEstateSchema>;
type iRealEstateReturnArray = z.infer<typeof returnRealEstateSchemaArray>

export { iRealEstate, iRealEstateReturn, iRealEstateReturnArray };
