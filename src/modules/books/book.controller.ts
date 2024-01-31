import { Controller,Post,Get,Put, Body,  Patch, Delete } from "@nestjs/common";
import { ParamId } from "src/decorators/param.id.decorator";

import { CreateBookDTO } from "./dto/create-book.dto";
import { UpdatePutBookDTO } from "./dto/update-book.dto";
import { UpdatePatchBookDTO } from "./dto/update-patch-book.dto";
import { BookService } from "./book.service";

@Controller('books')

export class BookController{

    constructor(private readonly bookService: BookService){}
    @Post()
    async create(@Body() data: CreateBookDTO){
        return this.bookService.create(data)
    }
    
    @Get()
    async list(){
        return this.bookService.list()
    }

    @Get(':id')
    async readOne( @ParamId() id:number){
        return this.bookService.show(id)
    }

    @Put(':id')
    async update(@Body() data:UpdatePutBookDTO, @ParamId() id:number){
        return this.bookService.update(id,data)

    }

    @Patch(':id')
    async updatePartial(@Body() data:UpdatePatchBookDTO, @ParamId() id:number){
        return this.bookService.updatePartial(id,data)

    }

    @Delete(':id')
    async delete(@ParamId() id:number){
        return this.bookService.delete(id)
    }

}