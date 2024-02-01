
import { PartialType } from '@nestjs/mapped-types';
import {IsString,  IsJWT, MinLength} from 'class-validator'
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResetDTO{
    
    @ApiProperty()
    @IsString()
    @MinLength(6)
    password:string
    
    @ApiProperty()
    @IsString()
    @IsJWT()   
    token:string

}