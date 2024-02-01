import { MiddlewareConsumer, Module, NestModule, RequestMethod,   } from '@nestjs/common';
import { ParamIdCheckMiddleware } from '../../middlewares/user-id-check.middleware';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { BookService } from '../books/book.service';
import { UserService } from '../users/user.service';
import { RentalHistoryController } from './rentalhistory.controller';
import { RentalHistoryService } from './rentalhistory.service';


@Module({
    imports:[],
    controllers:[RentalHistoryController],
    providers:[UserService,RentalHistoryService,PrismaService,BookService,AuthService],
    exports:[]
})

export class RentalHistoryModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ParamIdCheckMiddleware).forRoutes({
            path: 'rent/:id',
            method: RequestMethod.ALL
        })
    }
}