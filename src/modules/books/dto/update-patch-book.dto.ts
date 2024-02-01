import { CreateBookDTO } from "./create-book.dto";
import {PartialType} from '@nestjs/mapped-types'
import {IsString, IsEmail, IsNotEmpty, IsBoolean, IsOptional} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';


export class UpdatePatchBookDTO extends PartialType(CreateBookDTO){
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    title:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    author:string;

  
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    availability: boolean;
   
}