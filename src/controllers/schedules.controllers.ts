import { Request, Response } from "express";
import { createSchedulesService } from "../services/schedules/createSchedules.service";
import { listRealEstateSchedulesService } from "../services/schedules/listRealEstateSchedules.service";

const createSchedulesController = async (req: Request, res: Response) => {
  const newSchedule = await createSchedulesService(req.body, +req.user.id);

  return res.status(201).json({
    message: newSchedule
  });
};

const listRealEstateSchedulesController = async (req: Request, res: Response) => {
  const schedules = await listRealEstateSchedulesService(+req.params.id);

  return res.status(200).json(schedules);
};

export { createSchedulesController, listRealEstateSchedulesController }