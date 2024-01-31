
import {IsString,  IsBoolean, IsOptional, IsEmail, MinLength} from 'class-validator'

export class AuthSignDTO{

    @IsEmail()
    email:string;

    @IsString()
    @MinLength(6)
    password:string;

  
    
    
}