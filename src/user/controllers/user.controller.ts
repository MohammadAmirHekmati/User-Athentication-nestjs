import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserRegisterDto } from '../dto/user-register.dto';
import { UserService } from '../services/user.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { RoleGuard } from '../../auth/guard/role.guard';
import { RoleGuardDecorator } from '../../auth/decorator/role-guard.decorator';
import { RoleEnum } from '../../auth/role.enum';
import { PaginationDto } from '../dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService:UserService) {
  }

  @Post('register')
  async userRegister(@Body() userRegisterDto:UserRegisterDto):Promise<any>
  {
      return  await this.userService.userRegister(userRegisterDto)
  }

  @Post('login')
  async userLogin(@Body() userLoginDto:UserLoginDto):Promise<any>
  {
      return await this.userService.userLogin(userLoginDto)
  }

  @Get('getall')
  async getAllUser():Promise<any>
  {
    return await this.userService.getAllUser()
  }

  @RoleGuardDecorator(RoleEnum.USER,RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @Get('getall/paginate')
  async paginateGetAllUsers(@Body() paginationDto:PaginationDto):Promise<any>
  {
    return await  this.userService.paginateGetAllUsers(paginationDto)
  }

  @RoleGuardDecorator(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @Post('get/by/name')
  async getUserByUsername(@Body() username:string):Promise<any>
  {
    return await this.userService.getUserByUsername(username)
  }

  @RoleGuardDecorator(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @Get('get/:id')
  async getUserByID(@Body('id') user_id:string):Promise<any>
  {
    return await this.userService.getUserId(user_id)
  }

  @RoleGuardDecorator(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @Put('promote/to/admin/:id')
  async promoteUserToAdmin(@Param('id') user_id:string):Promise<any>
  {
    return await this.userService.promoteUserToAdmin(user_id)
  }

}