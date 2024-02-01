import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { NotFoundException } from "@nestjs/common";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-user.dto";

describe('UserService', () => {
    let userService: UserService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                PrismaService,
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const password = 'testpassword'
            const hashedPassword = await bcrypt.hash(password, 10);

            const createUserDTO: CreateUserDTO = {
                email: 'test@example.com',
                name: 'Test User',
                password: hashedPassword,
                role: 1,

            };
            const createUserMock = { ...createUserDTO, id: 1, active: true, createdAt: new Date(), updatedAt: new Date() };

            jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);
            jest.spyOn(prismaService.user, 'create').mockResolvedValue(createUserMock);
          
            const result = await userService.create(createUserDTO);

            expect(result.email).toEqual(createUserDTO.email);
            expect(result.name).toEqual(createUserDTO.name);
            expect(result.password).toEqual(hashedPassword);            
            expect(result.role).toEqual(createUserDTO.role);
        });

        it('should throw ConflictException if email is already in use', async () => {
            const existingUser = {
                id: 1,
                email: 'existing@example.com',
                name: 'Existing User',
                password: 'hashedpassword', // Lembre-se de fornecer uma senha já hashada, se necessário
                role: 1,
                active: true, // Adicione conforme necessário
                createdAt: new Date(), // Adicione conforme necessário ou defina como null
                updatedAt: new Date(), // Adicione conforme necessário ou defina como null
            };

            const createUserDTO: CreateUserDTO = {
                email: 'test@example.com',
                name: 'Test User',
                password: 'testpassword',
                role: 1,
            };

            jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(existingUser);

            await expect(userService.create(createUserDTO)).rejects.toThrowError('E-mail already in use');
        });
    });
    describe('list', () => {
        it('should return a list of users', async () => {
            // Mock the data returned by prismaService.user.findMany
            const newDate = new Date()
            const users = [
                { id: 1, email: 'user1@example.com', name: 'User 1', password: '1234567',role: 1, active: true ,createdAt: newDate, updatedAt: newDate},
                { id: 2, email: 'user2@example.com', name: 'User 2', password: '1234567',role: 2, active: true ,createdAt: newDate, updatedAt: newDate},
            ];

            jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users);

            const result = await userService.list();

            expect(result).toEqual(users);
        });
    });
    describe('update', () => {
        it('should update a user', async () => {
            const userId = 1;
            const newDate = new Date()
            const password = 'testpassword'
            const hashedPassword = await bcrypt.hash(password, 10);

            const updateUserDTO: UpdatePutUserDTO = {
                email: 'updated@example.com',
                name: 'Updated User',
                password: hashedPassword,
                role: 2,
                active: true,
                
            };

            // Mock the data returned by prismaService.user.update
            const updatedUser = { id: userId, ...updateUserDTO, createdAt: new Date(), updatedAt: new Date() };

            jest.spyOn(prismaService.user, 'update').mockResolvedValue(updatedUser);
            jest.spyOn(userService, 'show').mockResolvedValue(updatedUser);

            const result = await userService.update(userId, updateUserDTO);

            expect(result).toEqual(updatedUser);
        });

        it('should throw NotFoundException if user is not found', async () => {
            const userId = 1;
            const password = 'testpassword'
            const hashedPassword = await bcrypt.hash(password, 10);

            const updateUserDTO: UpdatePutUserDTO = {
                email: 'updated@example.com',
                name: 'Updated User',
                password: hashedPassword,
                role: 2,
                active: true,
            };

            jest.spyOn(prismaService.user, 'update').mockResolvedValue(null);

            await expect(userService.update(userId, updateUserDTO)).rejects.toThrowError(NotFoundException);
        });
    });

    describe('updatePartial', () => {
        it('should partially update a user', async () => {
            const userId = 1;
            const updatePartialUserDTO: UpdatePatchUserDTO = {
                
                name: 'Updated User',
                role: 2,
                email: "",
                password: "",
                active: false
            };
            const password = 'testpassword'
            const hashedPassword = await bcrypt.hash(password, 10);

            // Mock the data returned by prismaService.user.update
            const updatedUser = { id: userId, name: 'Updated User',  email: 'updated@example.com', password: hashedPassword, role: 2,  active: true, createdAt: new Date(), updatedAt: new Date() };

            jest.spyOn(prismaService.user, 'update').mockResolvedValue(updatedUser);
            jest.spyOn(userService, 'show').mockResolvedValue(updatedUser);

            const result = await userService.updatePartial(userId, updatePartialUserDTO);

            expect(result).toEqual(updatedUser);
        });

        it('should throw NotFoundException if user is not found', async () => {
            const userId = 1;
            const updatePartialUserDTO: UpdatePatchUserDTO = {
                name: 'Updated User',
                role: 2,
                email: "",
                password: "",
                active: false
            };

            jest.spyOn(prismaService.user, 'update').mockResolvedValue(null);

            await expect(userService.updatePartial(userId, updatePartialUserDTO)).rejects.toThrowError(NotFoundException);
        });
    });

    describe('show', () => {
        it('should return a user by id', async () => {
            const userId = 1;
            const newDate = new Date()
            const user = { id: 1, email: 'user1@example.com', name: 'User 1', password: '1234567',role: 1, active: true ,createdAt: newDate, updatedAt: newDate}
              

            jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

            const result = await userService.show(userId);

            expect(result).toEqual(user);
        });

        it('should throw NotFoundException if user is not found', async () => {
            const userId = 1;
        
            jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(undefined); // Mock para retornar undefined
        
            await expect(userService.show(userId)).rejects.toThrowError(NotFoundException);
        });
        
    });
    describe('delete', () => {
        it('should deactivate a user by id', async () => {
            const userId = 1;
            const newDate = new Date();

            // Mock the data returned by prismaService.user.update
            const updatedUser = {
                id: 1,
                email: 'user1@example.com',
                name: 'User 1',
                password: '1234567',
                role: 1,
                active: true,
                createdAt: newDate,
                updatedAt: newDate,
            };

            jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(updatedUser);
            jest.spyOn(prismaService.user, 'update').mockResolvedValue(updatedUser);

            const result = await userService.delete(userId);

            expect(result).toEqual(updatedUser);
        });

        it('should throw NotFoundException if user is not found', async () => {
            const userId = 1;

            jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

            await expect(userService.delete(userId)).rejects.toThrowError(NotFoundException);
        });
    });
   
});
