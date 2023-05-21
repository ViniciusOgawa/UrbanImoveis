import { z } from "zod";
import { returnSchedulesSchema, schedulesSchema } from "../schemas/schedules.schema";

type iSchedules = z.infer<typeof schedulesSchema>
type iReturnSchedules = z.infer<typeof returnSchedulesSchema>

export { iSchedules, iReturnSchedules }