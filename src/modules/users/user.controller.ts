import { Controller,Post,Get,Put, Body,  Patch, Delete} from "@nestjs/common";
import { ParamId } from "../../decorators/param.id.decorator";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-user.dto";
import { UserService } from "./user.service";
import { Roles } from "../../decorators/role.decoration";
import { Role } from "../../enums/role.enums";
import { ApiOperation, ApiParam } from "@nestjs/swagger";

@Controller('users')

export class UserController{

    constructor(private readonly userService: UserService){}

    @ApiOperation({ summary: 'Rota para cadastrar usuário. Por padrão vai como não admin' })
    @Post()
    async create(@Body() data: CreateUserDTO){
        return this.userService.create(data)
    }

    @ApiOperation({ summary: 'Rota para cadastrar usuário. Somente usuário admin' })
    @Roles(Role.Admin)
    @Get()
    async list(){
        return this.userService.list()
    }

    @ApiOperation({ summary: 'Rota para ver UM usuário.' })
    @Roles(Role.Admin,Role.User)
    @ApiParam({
        type: 'inteiro', format: ':id',
        name: "Passe o ID do Usuário"
    })
    @Get(':id')
    async readOne( @ParamId() id:number){
        return this.userService.show(id)
    }

    @ApiOperation({ summary: 'Rota para atualizar dados de um usuário.' })
    @Roles(Role.Admin,Role.User)
    @ApiParam({
        type: 'inteiro', format: ':id',
        name: "Passe o ID do Usuário"
    })
    @Put(':id')
    async update(@Body() data:UpdatePutUserDTO, @ParamId() id:number){
        return this.userService.update(id,data)

    }


    @ApiOperation({ summary: 'Rota para dados parciais Atualizar dados de um usuário.' })
    @Roles(Role.Admin,Role.User)
    @ApiParam({
        type: 'inteiro', format: ':id',
        name: "Passe o ID do Usuário"
    })
    @Patch(':id')
    async updatePartial(@Body() data:UpdatePatchUserDTO, @ParamId() id:number){
        return this.userService.updatePartial(id,data)

    }


    @ApiOperation({ summary: 'Rota para desativar um usuário. Somente usuário admin' })
    @ApiParam({
        type: 'inteiro', format: ':id',
        name: "Passe o ID do Usuário"
    })
       @Roles(Role.Admin)
    @Delete(':id')
    async delete(@ParamId() id:number){
        return this.userService.delete(id)
    }

}