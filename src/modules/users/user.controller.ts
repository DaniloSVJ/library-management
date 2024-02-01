import { Controller,Post,Get,Put, Body, UseGuards, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { ParamId } from "src/decorators/param.id.decorator";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-user.dto";
import { UserService } from "./user.service";
import { AuthGuard } from '@nestjs/passport';

@Controller('users')

export class UserController{

    constructor(private readonly userService: UserService){}
    @Post()
    async create(@Body() data: CreateUserDTO){
        return this.userService.create(data)
    }
    
    @Get()
    async list(){
        return this.userService.list()
    }

    @Get(':id')
    async readOne( @ParamId() id:number){
        return this.userService.show(id)
    }

    @Put(':id')
    async update(@Body() data:UpdatePutUserDTO, @ParamId() id:number){
        return this.userService.update(id,data)

    }

    @Patch(':id')
    async updatePartial(@Body() data:UpdatePatchUserDTO, @ParamId() id:number){
        return this.userService.updatePartial(id,data)

    }

    @Delete(':id')
    async delete(@ParamId() id:number){
        return this.userService.delete(id)
    }

}