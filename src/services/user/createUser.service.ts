import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUser, iUserReturn } from "../../interfaces/user.interface";
import { returnUserSchema } from "../../schemas/user.schema";

const createUserService = async (userData: iUser): Promise<iUserReturn> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user: User = userRepository.create(userData);
  
    await userRepository.save(user);
  
    const newUser: iUserReturn = returnUserSchema.parse(user);
  
    return newUser;

}

export { createUserService }