import { compare } from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { iLogin } from "../../interfaces/login.interface";
import jwt from "jsonwebtoken"
import "dotenv/config"

const createLoginService = async (loginData: iLogin): Promise<string> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const findUser: User | null = await userRepository.findOneBy({
        email: loginData.email
    })

    if(!findUser){
        throw new AppError("Invalid credentials", 401);
    }

    const passwordMatch = await compare(loginData.password, findUser.password);

    if(!passwordMatch){
        throw new AppError("Invalid credentials", 401);
    }

    const token: string = jwt.sign(
        {
            admin: findUser.admin
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: "24h",
            subject: String(findUser.id)
        }
    )

        return token;

}

export { createLoginService }