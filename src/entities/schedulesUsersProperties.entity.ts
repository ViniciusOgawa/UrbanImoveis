import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./realEstate.entity";
import { User } from "./user.entity";

@Entity("schedules_users_properties")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  hour: string;

  @Column({ type: "date" })
  date: string | Date;

  @ManyToOne(() => RealEstate, realEstate => realEstate.id)
  realEstate: RealEstate;

  @ManyToOne(() => User, user => user.id)
  user: User;
}

export { Schedule };
