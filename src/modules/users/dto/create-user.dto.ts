
import {IsString, IsEmail, IsStrongPassword, IsBoolean, IsOptional} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO{
    @ApiProperty()
    @IsString()
    name:string;

    @ApiProperty()
    @IsEmail()
    email:string;

    @ApiProperty()
    @IsStrongPassword({
        minLength: 6,
        minNumbers:0,
        minLowercase:0,
        minSymbols:0,
        minUppercase:0
    })
    password:string;

    
}