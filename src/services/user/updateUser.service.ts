import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUserReturn, iUserUpdate } from "../../interfaces/user.interface";
import { returnUserSchema } from "../../schemas/user.schema";

const updateUserService = async (userData: iUserUpdate, idUser: number): Promise<iUserReturn> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const oldUserData = await userRepository.findOneBy({
        id: idUser
    });

    const user = userRepository.create({
        ...oldUserData,
        ...userData
    });

    await userRepository.save(user);

    const updatedUser = returnUserSchema.parse(user);
    
    return updatedUser;

}

export { updateUserService }