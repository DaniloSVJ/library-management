
import {IsString,  IsBoolean, IsOptional} from 'class-validator'

export class CreateBookDTO{

    @IsString()
    title:string;

    @IsString()
    author:string;

  
    
    @IsOptional()
    @IsBoolean()
    availability: boolean;
    
}