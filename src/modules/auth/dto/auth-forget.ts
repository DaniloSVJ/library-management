
import { PartialType } from '@nestjs/mapped-types';
import {IsString,  IsBoolean, IsOptional, IsEmail, MinLength} from 'class-validator'
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AuthForgetDTO{
    
    @ApiProperty()
    @IsEmail()
    email:string
    
}