import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/guards/constants';
import { UserModule } from 'src/modules/users/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
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
