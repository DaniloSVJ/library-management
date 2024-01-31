
import { PartialType } from '@nestjs/mapped-types';
import {IsString,  IsJWT, MinLength} from 'class-validator'
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';

export class AuthResetDTO{
    
    @IsString()
    @MinLength(6)
    password:string

    @IsString()
    @IsJWT()   
    token:string

}