import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../guards/constants';
import { UserModule } from '../../modules/users/user.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret
        }),
        UserModule,
        PrismaModule
    ],
    controllers: [AuthController],
    providers:[AuthService],
    exports:[AuthService]
})

export class AuthModule { }
