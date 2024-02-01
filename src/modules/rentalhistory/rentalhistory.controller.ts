import { Controller,Post,Get, Body, Headers ,Patch } from "@nestjs/common";
import { CreateRentalHistoryDTO } from "./dto/create-rentalhistory.dto";
import { RentalHistoryService } from "./rentalhistory.service";
import { AuthService } from "../auth/auth.service";
import { ParamId } from "../../decorators/param.id.decorator";
import { Roles } from "../../decorators/role.decoration";
import { Role } from "../../enums/role.enums";
import { ApiOperation, ApiParam } from "@nestjs/swagger";

@Controller('rent')
export class RentalHistoryController{

    constructor(
        private readonly authService:AuthService,
        private readonly rentalHistoryService: RentalHistoryService){}

    @ApiOperation({ summary: 'Rota para fazer empréstimo. Pelo token já identifica usuário' })
    @Roles(Role.Admin,Role.User)
    @Post()
    async rentBook(@Headers("authorization") token , @Body() data: CreateRentalHistoryDTO){
        const {id} = this.authService.checkToken(token.split(' ')[1])
        return this.rentalHistoryService.rentBook(id,data)
    }

    @ApiOperation({ summary: 'Rota para listar livros de usuários. Pelo token já identifica usuário' })
    @Roles(Role.Admin,Role.User)
    @Get()
    async list(@Headers("authorization") token){
        const {id} = this.authService.checkToken(token.split(' ')[1])
        return this.rentalHistoryService.list(id)
    }

    @ApiOperation({ summary: 'Passe o ID do Livro. Rota para devolver livro. Pelo token já identifica usuário' })
    @ApiParam({
        type: 'int', format: ':id',
        name: "Passe o ID do Livro"
    })	
    @Roles(Role.Admin,Role.User)
    @Patch(':id')
    async returnBook(@Headers("authorization") token,@ParamId() bookId:number){
        const {id} = this.authService.checkToken(token.split(' ')[1])
        return this.rentalHistoryService.returnBook(id,Number(bookId))

        
    }

  

}