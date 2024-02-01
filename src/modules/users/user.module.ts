import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { ParamIdCheckMiddleware } from 'src/middlewares/user-id-check.middleware';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports:[],
    controllers:[UserController],
    providers:[UserService,PrismaService],
    exports:[UserService]
})

export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ParamIdCheckMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        })
    }
}
