import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/users/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        JwtModule.register({
            secret: `TM;CB|+^'w'$YB&;b3oTX;-o7hwZelY$`
        }),
        UserModule,
        PrismaModule
    ],
    controllers: [AuthController]
})

export class AuthModule { }
