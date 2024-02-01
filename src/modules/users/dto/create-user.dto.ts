
import {IsString, IsEmail, IsStrongPassword, IsBoolean, IsOptional, IsEnum} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../enums/role.enums';

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

    @ApiProperty({example:'string //opcional. Mas para cadastrar como admin coloque 2'})
    @IsOptional()
    @IsEnum(Role)
    role: number

    
}