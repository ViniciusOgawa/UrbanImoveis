import { Router } from "express";
import { createSchedulesController, listRealEstateSchedulesController } from "../controllers/schedules.controllers";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin.middleware";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid.middleware";
import { schedulesSchema } from "../schemas/schedules.schema";
import { ensureHourScheduleIsValid } from "../middlewares/ensureHourScheduleIsValid.middleware";
import { ensureDateScheduleIsValid } from "../middlewares/ensureDateScheduleIsValid.middleware";

const schedulesRoutes: Router = Router();

schedulesRoutes.post("", ensureTokenIsValid, ensureDataIsValid(schedulesSchema), ensureHourScheduleIsValid, ensureDateScheduleIsValid, createSchedulesController);
schedulesRoutes.get("/realEstate/:id", ensureTokenIsValid, ensureUserIsAdmin, listRealEstateSchedulesController);

export { schedulesRoutes }