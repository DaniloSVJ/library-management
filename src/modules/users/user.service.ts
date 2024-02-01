import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService{

    constructor(private readonly prisma: PrismaService){}

    async create({email,name,password,role}:CreateUserDTO){

        const existingUser = await this.prisma.user.findFirst({
            where:{
                email
            }
        })

        if (existingUser) {
          throw new ConflictException('E-mail already in use');
        }
        const hashedPassword = await bcrypt.hash(password, 10); // 10 é o número de rounds de hash

        return this.prisma.user.create({
            data:{
                email,
                name,
                password:hashedPassword,
                role
                
            },
            
        })
    }

    async list(){
        return this.prisma.user.findMany()
    }

    async show(id:number){
        const user = await this.prisma.user.findUnique({
            where:{
                id
            }
        })
        if(!user){
            throw new NotFoundException('User not found')
        }
        return user
    }

    async update(id:number,data:UpdatePutUserDTO){
        const typeuser = await this.show(id)
        if(!typeuser){
            throw new NotFoundException('User not found')
        }
        if( typeuser.role==1 && data.active==false){
            throw new NotFoundException('Only admin users can disable')
        }

        if( typeuser.role==1 && data.role==2){
            throw new NotFoundException('Only admin users can apply rule')
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
      
        const typeuser = await this.show(id)
        if(!typeuser){
            throw new NotFoundException('User not found')
        }
        //Verifica se usuario comum está desativando outros usuários
        if( typeuser.role==1 && data.active==false){
            throw new NotFoundException('Only admin users can disable')
        }
        //Verifica se usuário comum está mudando para ser admin
        if( typeuser.role==1 && data.role==2){
            throw new NotFoundException('Only admin users can apply rule')
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
        const user = await this.prisma.user.findUnique({
            where:{
                id
            }
        })
        if(!user){
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