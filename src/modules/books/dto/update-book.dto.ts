import { CreateBookDTO } from "./create-book.dto";
import {IsString, IsNotEmpty, IsBoolean, IsOptional} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';


export class UpdatePutBookDTO extends CreateBookDTO{
   
    @ApiProperty()
    @IsString()
    title:string;

    @ApiProperty()
    @IsString()
    author:string;
  
    @ApiProperty({example:'boolean //opcional'})
    @IsOptional()
    @IsBoolean()
    availability: boolean;
   
}