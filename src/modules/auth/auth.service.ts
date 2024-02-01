
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import {User} from 'prisma/prisma-client'
import { Subject } from "rxjs";
import { UserService } from "../../modules/users/user.service";
import { AuthRegisterDTO } from "./dto/auth-register";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) { }

     createToken(user:User) {
        return this.jwtService.sign({
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        },{
            expiresIn:'7 days',
            subject:String(user.id),
            issuer:'login',
            audience:'user'
        })
    }

    checkToken(token:string) {
        try {
            return this.jwtService.verify(token,{
                audience:'user',
                issuer:'login'
            })
        } catch (e) {
            throw new BadRequestException(e)
        }
       
    }
    isValidToken(token:string) {
        try {
            this.jwtService.verify(token)
            return true
        } catch (e) {
            return true
        }
       
    }
    async signIn(email: string, password: string) {
        const user = await this.prisma.user.findFirst({ where: { email } });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }


        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid email or password');
        }


        return this.createToken(user);
    }
  
    async register(data: AuthRegisterDTO) {
        const user = await this.userService.create(data)
        return this.createToken(user);

    }
  
}