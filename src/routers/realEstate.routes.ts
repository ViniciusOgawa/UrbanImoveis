import { Router } from "express";
import { createRealEstateController, listRealEstateController } from "../controllers/realEstate.controller";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid.middleware";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin.middleware";
import { ensureAddressExists } from "../middlewares/ensureAddressExists.middleware";
import { realEstateSchema } from "../schemas/realEstate.schema";

const realEstateRoutes: Router = Router();

realEstateRoutes.post("", ensureTokenIsValid, ensureUserIsAdmin, ensureDataIsValid(realEstateSchema), ensureAddressExists, createRealEstateController);
realEstateRoutes.get("", listRealEstateController)

export { realEstateRoutes };
