import { z } from "zod";
import { returnRealEstateSchema } from "./realEstate.schema";
import { returnUserSchema } from "./user.schema";

const schedulesSchema = z.object({
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number()
});

const returnSchedulesSchema = z.object({
    id: z.number(),
    date: z.string(),
    hour: z.string(),
    realEstate: returnRealEstateSchema,
    user: returnUserSchema
});

export { returnSchedulesSchema, schedulesSchema }