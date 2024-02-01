
import {IsString,  IsBoolean, IsOptional, IsEmail, MinLength, IsNotEmpty} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class AuthSignDTO{

    @ApiProperty()
    @IsEmail()
    email:string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    password:string;

  
    
    
}