import { Module } from '@nestjs/common';

import { BookModule} from './modules/books/book.module'
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [UserModule,BookModule],
 
})
export class AppModule {}
