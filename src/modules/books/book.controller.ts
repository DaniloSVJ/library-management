import { Controller,Post,Get,Put, Body,  Patch, Delete } from "@nestjs/common";
import { ParamId } from "../../decorators/param.id.decorator";

import { CreateBookDTO } from "./dto/create-book.dto";
import { UpdatePutBookDTO } from "./dto/update-book.dto";
import { UpdatePatchBookDTO } from "./dto/update-patch-book.dto";
import { BookService } from "./book.service";
import { ApiOperation } from "@nestjs/swagger";
import { Roles } from "../../decorators/role.decoration";
import { Role } from "../../enums/role.enums";

@Controller('books')

export class BookController{

    constructor(private readonly bookService: BookService){}
    @ApiOperation({ summary: 'Cadastrar livros. Somente Usuarios Admin pode cadastrar' })
    @Roles(Role.Admin)
    @Post()
    async create(@Body() data: CreateBookDTO){
        return this.bookService.create(data)
    }


    @ApiOperation({ summary: 'Listar livros' })
    @Roles(Role.Admin,Role.User)
    @Get()
    async list(){
        return this.bookService.list()
    }

    @ApiOperation({ summary: 'Ver detalhe de livros' })
    @Roles(Role.Admin,Role.User)
    @Get(':id')
    async readOne( @ParamId() id:number){
        return this.bookService.show(id)
    }

    @ApiOperation({ summary: 'Atualizar total' })
    @Roles(Role.Admin,Role.User)
    @Put(':id')
    async update(@Body() data:UpdatePutBookDTO, @ParamId() id:number){
        return this.bookService.update(id,data)

    }

    @ApiOperation({ summary: 'Atualizar parcialmente' })
    @Roles(Role.Admin,Role.User)
    @Patch(':id')
    async updatePartial(@Body() data:UpdatePatchBookDTO, @ParamId() id:number){
        return this.bookService.updatePartial(id,data)

    }

    @ApiOperation({ summary: 'Desativar livros, Somente Usuarios Admin podem desativar' })
    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@ParamId() id:number){
        return this.bookService.delete(id)
    }

}