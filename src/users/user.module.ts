import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
UserController
@Module({
    imports:[],
    controllers:[UserController],
    providers:[],
    exports:[]
})

export class UserModule{}