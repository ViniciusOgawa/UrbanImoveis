import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import { iSchedules } from "../../interfaces/schedules.interface";

const createSchedulesService = async (scheduleData: iSchedules, userId: number) => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
    const schedulesRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule);
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const findRealEstate: RealEstate | null = await realEstateRepository.findOne({
        where: {
            id: scheduleData.realEstateId
        }
    });

    const findUser: User | null = await userRepository.findOne({
        where: {
            id: userId
        }
    });

    if(!findUser){
        throw new AppError("User not exists", 404);
    }

    if(!findRealEstate){
        throw new AppError("RealEstate not found", 404);
    }
    const scheduleQb2 = await schedulesRepository.createQueryBuilder("schedules_users_properties")
    .innerJoinAndSelect("schedules_users_properties.user","user")
    .where("user.id = :id", {id: userId})
    .andWhere("schedules_users_properties.date = :date", {date: scheduleData.date})
    .andWhere("schedules_users_properties.hour = :hour", {hour: scheduleData.hour})
    .getOne()

    if(scheduleQb2){
        throw new AppError("User schedule to this real estate at this date and time already exists", 409);
    }

    const scheduleQb = await schedulesRepository.createQueryBuilder("schedules_users_properties")
    .innerJoinAndSelect("schedules_users_properties.realEstate","realEstate")
    .where("realEstate.id", {id: scheduleData.realEstateId})
    .andWhere("schedules_users_properties.date = :date", {date: scheduleData.date})
    .andWhere("schedules_users_properties.hour = :hour", {hour: scheduleData.hour})
    .getOne()

    if(scheduleQb){
        throw new AppError("Schedule to this real estate at this date and time already exists", 409);
    }

    const schedules: Schedule = schedulesRepository.create({
        date: scheduleData.date,
        hour: scheduleData.hour,
        realEstate: findRealEstate,
        user: findUser
    })

    await schedulesRepository.save(schedules);

    return "Schedule created";

}

export { createSchedulesService }