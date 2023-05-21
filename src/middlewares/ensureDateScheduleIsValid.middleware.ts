import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureDateScheduleIsValid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const date = new Date(req.body.date);

    if (date.getUTCDay() === 0 || date.getUTCDay() === 6) {
        throw new AppError("Invalid date, work days are monday to friday", 400);
    }

    return next();

}

export { ensureDateScheduleIsValid }