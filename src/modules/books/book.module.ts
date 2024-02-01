import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ParamIdCheckMiddleware } from 'src/middlewares/user-id-check.middleware';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookController } from './book.controller';
import { BookService } from './book.service';


@Module({
    imports:[],
    controllers:[BookController],
    providers:[BookService,PrismaService],
    exports:[BookService]
})

export class BookModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ParamIdCheckMiddleware).forRoutes({
            path: 'books/:id',
            method: RequestMethod.ALL
        })
    }
}
