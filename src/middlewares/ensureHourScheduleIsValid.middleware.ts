import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureHourScheduleIsValid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const hour: string = req.body.hour

    const date = new Date(`05 October 2011 ${hour} UTC`);

    const verifyDate1 = new Date(`05 October 2011 08:00 UTC`);
    const verifyDate2 = new Date(`05 October 2011 18:00 UTC`);

    if (verifyDate1.getTime() > date.getTime()) {
        throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
    }
    else if(verifyDate2.getTime() < date.getTime()){
        throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
    }

    return next();

}

export { ensureHourScheduleIsValid }