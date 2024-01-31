import { CreateBookDTO } from "./create-book.dto";
import {IsString, IsEmail, IsStrongPassword, IsBoolean, IsOptional} from 'class-validator'


export class UpdatePutBookDTO extends CreateBookDTO{
    @IsString()
    title:string;

    @IsString()
    author:string;
    
    @IsOptional()
    @IsBoolean()
    availability: boolean;
   
}