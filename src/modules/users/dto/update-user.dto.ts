import { CreateUserDTO } from "./create-user.dto";
import {IsString, IsEmail, IsStrongPassword, IsBoolean, IsOptional} from 'class-validator'


export class UpdatePutUserDTO extends CreateUserDTO{

   
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @IsStrongPassword({
        minLength: 6,
        minNumbers:0,
        minLowercase:0,
        minSymbols:0,
        minUppercase:0
    })
    password:string;
    
    @IsOptional()
    @IsBoolean()
    active: boolean;
}