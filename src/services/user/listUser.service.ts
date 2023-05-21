import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUserArray } from "../../interfaces/user.interface";
import { returnArrayUserSchema } from "../../schemas/user.schema";

const listUsersService = async (): Promise<iUserArray> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User);
  
    const findUsers: Array<User> = await userRepository.find()
  
    const users = returnArrayUserSchema.parse(findUsers);
  
    return users;

};

export { listUsersService }