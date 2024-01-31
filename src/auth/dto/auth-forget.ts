
import { PartialType } from '@nestjs/mapped-types';
import {IsString,  IsBoolean, IsOptional, IsEmail, MinLength} from 'class-validator'
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';

export class AuthForgetDTO{
    
    @IsEmail()
    email:string
    
}