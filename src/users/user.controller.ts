import { Controller,Post,Get,Put, Body, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-user.dto";

@Controller('users')

export class UserController{
    @Post()
    async create(@Body() body: CreateUserDTO){
        return body
    }
    
    @Get()
    async list(){
        return {users:[]}
    }

    @Get(':id')
    async readOne( @Param('id',ParseIntPipe) id:number){
        return {users:{},id}
    }

    @Put(':id')
    async update(@Body() body:UpdatePutUserDTO, @Param('id',ParseIntPipe) id:number){
        return {
            method:'put',
            body,
            id
        }
    }

    @Patch(':id')
    async updatePartial(@Body() body:UpdatePatchUserDTO, @Param('id',ParseIntPipe) id:number){
        return {
            method:'patch',
            body,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id:number){
        return {
            id
        }
    }

}