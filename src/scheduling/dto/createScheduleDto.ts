import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateScheduleDto {
    @IsNotEmpty()
    @IsString()
    doctor_id!: string;

    @IsNotEmpty()
    @IsString()
    patient_name!: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)
    appointment_datetime!: Date;
}