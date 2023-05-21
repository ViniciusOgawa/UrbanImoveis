import { z } from "zod";
import { addressSchema, returnAddressSchema } from "../schemas/address.schema";

type iAddress = z.infer<typeof addressSchema>;
type iAddressReturn = z.infer<typeof returnAddressSchema>;

export { iAddress, iAddressReturn };
