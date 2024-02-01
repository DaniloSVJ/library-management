
import {IsNumber,IsNotEmpty} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';


export class CreateRentalHistoryDTO{

    @ApiProperty()
    @IsNumber()
    bookId:number;
    
}