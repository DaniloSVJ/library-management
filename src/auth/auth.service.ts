
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import {User} from 'prisma/prisma-client'
import { Subject } from "rxjs";
import { UserService } from "src/modules/users/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) { }

    async createToken(user:User) {
        return this.jwtService.sign({
            id:user.id,
            name:user.name,
            email:user.email
        },{
            expiresIn:'7 days',
            subject:String(user.id),
            issuer:'login',
            audience:'user'
        })
    }

    async checkToken() {

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
    async forget(email: string) {
        const user = await this.prisma.user.findFirst({ where: { email } });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }


       

        //enviar email
        return user;
    }
    async register(password:string, token:string) {
        //se o token for valido

        // await this.prisma.user.update({
            
        // })
    }
    async reset(password:string, token:string) {
        //se o token for valido

        // await this.prisma.user.update({
            
        // })
    }
}