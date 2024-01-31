import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBookDTO } from "./dto/create-book.dto";
import { UpdatePatchBookDTO } from "./dto/update-patch-book.dto";
import { UpdatePutBookDTO } from "./dto/update-book.dto";


@Injectable()
export class BookService{

    constructor(private readonly prisma: PrismaService){}

    async create({title,author}:CreateBookDTO){
        
        return this.prisma.books.create({
            data:{
                title,
                author
                
            },
            
        })
    }

    async list(){
        return this.prisma.books.findMany()
    }

    async show(id:number){
        return this.prisma.books.findUnique({
            where:{
                id
            }
        })
    }

    async update(id:number,data:UpdatePutBookDTO){
        if(!(await this.show(id))){
            throw new NotFoundException('Book not found')
        }
      
        return this.prisma.books.update({
            data,
            where:{
                id
            }

            
        })
    }

    async updatePartial(id:number,data:UpdatePatchBookDTO){
        if(!(await this.show(id))){
            throw new NotFoundException('Book not found')
        }
        
       
        return this.prisma.books.update({
            data,
            where:{
                id
            }

            
        })
    }

    async delete(id:number){
        if(!(await this.show(id))){
            throw new NotFoundException('Book not found')
        }
        return this.prisma.books.update({
            data:{
                active:false
            },
            where:{
                id
            }

            
        })
    }
}