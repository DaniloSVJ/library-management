import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSignDTO } from './dto/auth-signIn';
import { AuthRegisterDTO } from './dto/auth-register';
import { Public } from '../../guards/constants';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../users/user.service';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService,JwtService,PrismaService,UserService],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    describe('signIn', () => {
        it('should sign in user', async () => {
            const authSignDTO: AuthSignDTO = {
                email: 'test@example.com',
                password: 'testpassword',
            };

            jest.spyOn(authService, 'signIn').mockResolvedValue('mockedAccessToken');

            const result = await authController.signIn(authSignDTO);

            // expect(result).toEqual({ accessToken: 'mockedAccessToken' });
            expect(result).toEqual('mockedAccessToken');

        });
    });

    describe('register', () => {
        it('should register a new user', async () => {
            const authRegisterDTO: AuthRegisterDTO = {
                email: 'test@example.com',
                password: 'testpassword',
                name: 'Test User',
                role: 0
            };

            jest.spyOn(authService, 'register').mockResolvedValue('User registered successfully');

            const result = await authController.register(authRegisterDTO);

            expect(result).toEqual('User registered successfully');
        });
    });
});
