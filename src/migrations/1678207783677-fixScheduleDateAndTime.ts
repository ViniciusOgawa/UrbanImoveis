import { MigrationInterface, QueryRunner } from "typeorm";

export class fixScheduleDateAndTime1678207783677 implements MigrationInterface {
    name = 'fixScheduleDateAndTime1678207783677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD "hour" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD "date" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD "hour" character varying NOT NULL`);
    }

}
