import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService{

    constructor(private readonly prisma: PrismaService){}

    async create({email,name,password}:CreateUserDTO){

        const existingUser = await this.prisma.user.findFirst({
            where:{
                email
            }
        })

        if (existingUser) {
          // E-mail já em uso, lançar uma exceção de conflito
          throw new ConflictException('E-mail already in use');
        }
        const hashedPassword = await bcrypt.hash(password, 10); // 10 é o número de rounds de hash

        return this.prisma.user.create({
            data:{
                email,
                name,
                password:hashedPassword,
                
            },
            
        })
    }

    async list(){
        return this.prisma.user.findMany()
    }

    async show(id:number){
        return this.prisma.user.findUnique({
            where:{
                id
            }
        })
    }

    async update(id:number,data:UpdatePutUserDTO){
        if(!(await this.show(id))){
            throw new NotFoundException('User not found')
        }
        const hashedPassword = await bcrypt.hash(data.password, 10); // 10 é o número de rounds de hash
        data.password = hashedPassword

        return this.prisma.user.update({
            data,
            where:{
                id
            }

            
        })
    }

    async updatePartial(id:number,data:UpdatePatchUserDTO){
        if(!(await this.show(id))){
            throw new NotFoundException('User not found')
        }
        
        if( data.password){
            const hashedPassword = await bcrypt.hash(data.password, 10); // 10 é o número de rounds de hash
            data.password = hashedPassword
    
        }
        return this.prisma.user.update({
            data,
            where:{
                id
            }

            
        })
    }

    async delete(id:number){
        if(!(await this.show(id))){
            throw new NotFoundException('User not found')
        }
        return this.prisma.user.update({
            data:{
                active:false
            },
            where:{
                id
            }

            
        })
    }
}