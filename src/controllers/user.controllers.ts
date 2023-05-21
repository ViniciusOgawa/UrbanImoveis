import { Request, Response } from "express";
import { iUser, iUserArray, iUserReturn } from "../interfaces/user.interface";
import { createUserService } from "../services/user/createUser.service";
import { deleteUserService } from "../services/user/deleteUser.service";
import { listUsersService } from "../services/user/listUser.service";
import { updateUserService } from "../services/user/updateUser.service";

const createUserController = async (req: Request, res: Response) => {

    const userData: iUser = req.body;

    const newUser: iUserReturn = await createUserService(userData);

    return res.status(201).json(newUser);

}

const listUserController = async (req: Request, res: Response) => {

    const users: iUserArray = await listUsersService();
    
    return res.json(users)

}

const deleteUserController = async (req: Request, res: Response) => {

    const idUser = +req.params.id;

    await deleteUserService(idUser);

    return res.status(204).send();

}

const updateUserController = async (req: Request, res: Response) => {

    const userData = req.body;

    const userId = +req.params.id;

    const updatedUser = await updateUserService(userData, userId);

    return res.json(updatedUser);

}

export { createUserController, listUserController, deleteUserController, updateUserController }