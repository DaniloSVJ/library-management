import { CreateUserDTO } from "./create-user.dto";
import {PartialType} from '@nestjs/mapped-types'
import {IsString, IsEmail, IsStrongPassword, IsBoolean, IsOptional, IsEnum} from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../../enums/role.enums";

export class UpdatePatchUserDTO extends PartialType(CreateUserDTO){
    @ApiProperty()
    @IsOptional()
    @IsString()
    name:string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email:string;

    @ApiProperty()
    @IsOptional()
    @IsStrongPassword({
        minLength: 6,
        minNumbers:0,
        minLowercase:0,
        minSymbols:0,
        minUppercase:0
    })
    password:string;
    
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    active: boolean;

    @ApiProperty({example:'string //opcional. Mas para cadastrar como admin coloque 2'})
    @IsOptional()
    @IsEnum(Role)
    role: number
}