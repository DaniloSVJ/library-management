import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { BookService } from "../books/book.service";
import { UserService } from "../users/user.service";
import { CreateRentalHistoryDTO } from "./dto/create-rentalhistory.dto";


@Injectable()
export class RentalHistoryService{

    constructor(
        private readonly prisma: PrismaService,
        private readonly bookService: BookService,
        private readonly userService: UserService,
        ){}

    async rentBook(userId,{bookId}:CreateRentalHistoryDTO){
        const verifyUser = await this.userService.show(userId)

        if(verifyUser.active==false){
            throw new NotFoundException('User disabled in the system')
        }

        const book = await this.bookService.show(bookId)
        if(!book){
            throw new NotFoundException('Book not found')
        }

        await this.prisma.books.update({
            data:{
                availability:false
            },
            where:{
                id:bookId
            }
        })
        const rentdate = new Date();
        return this.prisma.rentalHistory.create({
            data:{
                userId,bookId,rentdate
            },
            
        })
    }

    async list(userId) {
        console.log('userId:', userId);
        const rentalHistory = await this.prisma.rentalHistory.findMany({
            where: {
                userId
            }
        });
        console.log('Rental History:', rentalHistory);
        return rentalHistory
    }

    async show(id:number){
        return this.prisma.rentalHistory.findUnique({
            where:{
                id
            }
        })
    }

  

    async returnBook(userId: number, bookId: number) {


        const id = Number(bookId);
    
        const book = await this.prisma.books.findUnique({
            where: {
                id: bookId
            }
        });
    
        if (!book) {
            throw new NotFoundException('Book not found');
        }
    
        await this.prisma.books.update({
            data: {
                availability: true
            },
            where: {
                id
            }
        });
    
        const rent = await this.prisma.rentalHistory.findFirst({
            where: {
                bookId,
                userId
            }
        });
        console.log('userId:', userId, 'bookId:', bookId, 'Rent:', rent);

        if (!rent) {
            throw new NotFoundException('Rental history not found');
        }
    
        return await this.prisma.rentalHistory.update({
            data: {
                returndate: new Date()
            },
            where: {
                id: rent.id
            }
        });
    }
    

  
}