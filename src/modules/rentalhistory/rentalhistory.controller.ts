import { Controller,Post,Get, Body, Headers ,Patch } from "@nestjs/common";
import { CreateRentalHistoryDTO } from "./dto/create-rentalhistory.dto";
import { UpdatePatchRentalHistoryDTO } from "./dto/update-patch-rentalhistory.dto";
import { RentalHistoryService } from "./rentalhistory.service";
import { AuthService } from "../auth/auth.service";
import { ParamId } from "src/decorators/param.id.decorator";

@Controller('rent')
export class RentalHistoryController{

    constructor(
        private readonly authService:AuthService,
        private readonly rentalHistoryService: RentalHistoryService){}
        
    @Post()
    async rentBook(@Headers("authorization") token , @Body() data: CreateRentalHistoryDTO){
        const {id} = this.authService.checkToken(token.split(' ')[1])
        return this.rentalHistoryService.rentBook(id,data)
    }
    
    @Get()
    async list(@Headers("authorization") token){
        const {id} = this.authService.checkToken(token.split(' ')[1])
        return this.rentalHistoryService.list(id)
    }

   

    @Patch(':id')
    async returnBook(@Headers("authorization") token,@Body() data:UpdatePatchRentalHistoryDTO,@ParamId() bookId:number){
        const {id} = this.authService.checkToken(token.split(' ')[1])
        return this.rentalHistoryService.returnBook(id,Number(bookId))

        
    }

  

}