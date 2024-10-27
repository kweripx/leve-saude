import { APIGatewayProxyHandler } from 'aws-lambda';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { SchedulingService } from '../service/schedulingService';
import { CreateScheduleDto } from '../dto/createScheduleDto';

const scheduleService = new SchedulingService();

/**
 * Handles the HTTP request to create a new appointment.
 * 
 * @param event - The API Gateway event containing request data.
 * 
 * @returns A promise that resolves to an APIGatewayProxyResult object containing the status code, headers, and body.
 * 
 * On success, returns a 201 status code with the created appointment data.
 * On failure, returns a 400 status code with the error message.
 * 
 * The request body must contain the following fields:
 * - doctor_id: The doctor's ID.
 * - patient_name: The patient's name.
 * - appointment_datetime: The date and time of the appointment in ISO format.
 */
export const createAppointment: APIGatewayProxyHandler = async (event) => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Request body is required' }),
            };
        }
        const scheduleDto = plainToClass(CreateScheduleDto, JSON.parse(event.body));
        const errors = await validate(scheduleDto);
        if (errors.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: errors }),
                errors: errors.map(error => ({
                    property: error.property,
                    constraints: error.constraints,
                })),
            };
        }
        const result = await scheduleService.createAppointment(scheduleDto);
        return {
            statusCode: 201,
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(result),
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: error.message }),
            };
        }
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        }
    }
}