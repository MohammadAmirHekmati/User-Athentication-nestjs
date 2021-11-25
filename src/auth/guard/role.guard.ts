import { Body, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleEnum } from '../role.enum';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../decorator/role-guard.decorator';
import { query } from 'express';

export class GetUserContext {
  username:string
  roles:RoleEnum[]
}
export class RoleGuard implements CanActivate{
  constructor() {
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
    const reflector=new Reflector()
   const roles=reflector.getAllAndOverride<RoleEnum[]>(ROLES,[
      context.getClass(),
     context.getHandler()
    ])

    if(!roles)
      return true

    const {user}:{user:GetUserContext}=context.switchToHttp().getRequest()
    Body
    header
    query
    ip
    origibase
    const canActive=roles.some((role)=>user.roles?.includes(role))

    return canActive


    return false
  }
}