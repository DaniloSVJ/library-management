import { Controller,Post,Get,Put, Body,  Patch, Delete } from "@nestjs/common";
import { UserService } from "src/modules/users/user.service";
import { AuthForgetDTO } from "./dto/auth-forget";
import { AuthRegisterDTO } from "./dto/auth-register";
import { AuthResetDTO } from "./dto/auth-reset";
import { AuthSignDTO } from "./dto/auth-signIn";


@Controller('auth')

export class AuthController{

    constructor(
        private readonly userService:UserService,

        ){}

    @Post('login')
    async signIn(@Body() body:AuthSignDTO){

    }

    @Post('register')
    async register(@Body() body:AuthRegisterDTO){
        return this.userService.create(body)

    }

    @Post('forget')
    async forget(@Body() body:AuthForgetDTO){

    }

    @Post('reset')
    async reset(@Body() body:AuthResetDTO){

    }



}
