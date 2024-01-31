import {INestApplication, Injectable, OnModuleInit,OnModuleDestroy} from "@nestjs/common"
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{

    async onModuleInit() {
      await  this.$connect();

    }


    async enableShutdownHooks(app: INestApplication) {
        // Use uma função anônima em vez de uma arrow function
        this.$disconnect()
    }

}
