import { Controller,Post,Headers,Put, Body,  Patch, Delete, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { Public } from "src/guards/constants";
import { UserService } from "src/modules/users/user.service";
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
    @Public()
    @Post('register')
    async register(@Body() body:AuthRegisterDTO){
        return this.authService.register(body)

    }
 

  
    @Public()
    @Post('me')
    async me(@Headers("authorization") token){
        return this.authService.checkToken(token.split(' ')[1])

    }

}
