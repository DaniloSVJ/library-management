import { Module } from '@nestjs/common';

import { BookModule} from './modules/books/book.module'
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { RentalHistoryModule } from './modules/rentalhistory/rentalhistory.module';
import { UseGuard } from './guards/auth-role.guard';

@Module({
  imports: [UserModule,BookModule,AuthModule,RentalHistoryModule],
  providers:[
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UseGuard,
    },
  ]
})
export class AppModule {}
