import { Controller,Post,Headers,Put, Body,  Patch, Delete, UseGuards } from "@nestjs/common";
import { Public } from "../../guards/constants";
import { AuthService } from "./auth.service";
import { AuthRegisterDTO } from "./dto/auth-register";
import { AuthSignDTO } from "./dto/auth-signIn";

import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';


@Controller('auth')

export class AuthController{

    constructor(
        
        private readonly authService:AuthService,

        ){}
    @ApiOperation({ summary: 'Realiza o login' })
    @ApiBody({ type: AuthSignDTO })        
    @Public()
    @Post('login')
    async signIn(@Body() {email,password}:AuthSignDTO){
        return this.authService.signIn(email,password)

    }
    @ApiOperation({ summary: 'Cadastrar usuários' })
    @Public()
    @Post('register')
    async register(@Body() body:AuthRegisterDTO){
        return this.authService.register(body)

    }
 

  
   
}
