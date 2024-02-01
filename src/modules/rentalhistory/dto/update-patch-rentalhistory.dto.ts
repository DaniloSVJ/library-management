import { CreateRentalHistoryDTO } from "./create-rentalhistory.dto";
import {PartialType} from '@nestjs/mapped-types'
import {IsDate, IsNumber,  IsNotEmpty, IsOptional} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';


export class UpdatePatchRentalHistoryDTO extends PartialType(CreateRentalHistoryDTO){
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    bookId:number;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    rentdate: Date;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    returndate: Date;
   
}