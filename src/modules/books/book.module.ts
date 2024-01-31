import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserIdCheckMiddleware } from 'src/middlewares/user-id-check.middleware';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookController } from './book.controller';
import { BookService } from './book.service';


@Module({
    imports:[],
    controllers:[BookController],
    providers:[BookService,PrismaService],
    exports:[]
})

export class BookModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        })
    }
}
