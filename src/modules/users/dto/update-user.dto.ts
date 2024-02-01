import { CreateUserDTO } from "./create-user.dto";
import {IsString, IsEmail, IsStrongPassword, IsBoolean, IsOptional} from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";


export class UpdatePutUserDTO extends CreateUserDTO{
    @ApiProperty({
        description: 'Parametro opcional de atualização',
    })
    @IsOptional()
    @IsBoolean()
    active: boolean;
}