
import { ApiProperty } from '@nestjs/swagger';
import {IsString,  IsBoolean, IsOptional, IsNotEmpty} from 'class-validator'

export class CreateBookDTO{
    @ApiProperty()
    @IsString()
    title:string;

    @ApiProperty()
    @IsString()
    author:string;

  
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    availability: boolean;
    
}