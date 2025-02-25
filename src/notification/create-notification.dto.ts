import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum DeliveryType {
    EMAIL = 'email',
    SMS = 'sms',
}

export class CreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsEnum(DeliveryType)
    @IsNotEmpty()
    delivery_type: DeliveryType;
}