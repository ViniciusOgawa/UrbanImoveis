import { Request, Response } from "express";
import { iRealEstateReturnArray } from "../interfaces/realEstate.interface";
import { createRealEstateService } from "../services/realEstate/createRealEstate.service";
import { listRealEstateService } from "../services/realEstate/listRealEstate.service";

const createRealEstateController = async (req: Request, res: Response) => {
  const newRealEstate = await createRealEstateService(req.body);

  return res.status(201).json(newRealEstate);
};

const listRealEstateController = async (req: Request, res: Response) => {

  const realEstates: iRealEstateReturnArray = await listRealEstateService()

  return res.status(200).json(realEstates);

}

export { createRealEstateController, listRealEstateController };
