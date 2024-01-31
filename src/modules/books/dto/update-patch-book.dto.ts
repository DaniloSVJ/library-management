import { CreateBookDTO } from "./create-book.dto";
import {PartialType} from '@nestjs/mapped-types'
import {IsString, IsEmail, IsStrongPassword, IsBoolean, IsOptional} from 'class-validator'

export class UpdatePatchBookDTO extends PartialType(CreateBookDTO){
    
    @IsOptional()
    @IsString()
    name:string;

    @IsOptional()
    @IsEmail()
    email:string;

    @IsOptional()
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