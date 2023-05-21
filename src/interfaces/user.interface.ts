import { DeepPartial } from "typeorm";
import { z } from "zod";
import { returnArrayUserSchema, returnUserSchema, userSchema, userUpdateSchema } from "../schemas/user.schema";

type iUser = z.infer<typeof userSchema>
type iUserReturn = z.infer<typeof returnUserSchema>
type iUserArray = z.infer<typeof returnArrayUserSchema>
type iUserUpdate = DeepPartial<iUser>

export { iUser, iUserReturn, iUserArray, iUserUpdate }