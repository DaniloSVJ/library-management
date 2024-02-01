
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY, jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decoration';
import { Role } from '../enums/role.enums';

@Injectable()
export class UseGuard implements CanActivate {
  constructor(
      private readonly reflector: Reflector
      ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

      const requeridRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[context.getHandler(),context.getClass()])

      if(!requeridRoles){
        return true
      }

      
      return true;
  }


}