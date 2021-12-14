import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserRegisterDto } from '../dto/user-register.dto';
import { UserService } from '../services/user.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { RoleGuard } from '../../auth/guard/role.guard';
import { RoleGuardDecorator } from '../../auth/decorator/role-guard.decorator';
import { RoleEnum } from '../../auth/role.enum';
import { PaginationDto } from '../dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { IpControllGuard } from '../../auth/guard/ip-controll.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService:UserService) {
  }

  @Post('register')
  async userRegister(@Body(ValidationPipe) userRegisterDto:UserRegisterDto):Promise<any>
  {
      return  await this.userService.userRegister(userRegisterDto)
  }

  @Post('login')
  async userLogin(@Body(ValidationPipe) userLoginDto:UserLoginDto):Promise<any>
  {
      return await this.userService.userLogin(userLoginDto)
  }

  @Get('getall/:id')
  async getAllUsers(@Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_FOUND})) id:number):Promise<any>
  {
    return await this.userService.getAllUsers(id)
  }

  @UseGuards(IpControllGuard)
  @Get('test')
  test()
  {
    return 'Ok'
  }

  @RoleGuardDecorator(RoleEnum.SUPPORTER,RoleEnum.ADMIN,RoleEnum.SUPERADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @Post('update/profile/:id')
  async updateUserProfile(@Param('id') user_id:string,@Body(ValidationPipe) updateUserProfileDto:UpdateUserProfileDto):Promise<any>
  {
    return await this.userService.updateUserProfile(user_id,updateUserProfileDto)
  }

  @RoleGuardDecorator(RoleEnum.USER,RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @Get('getall/paginate')
  async paginateGetAllUsers(@Query() paginationDto:PaginationDto):Promise<any>
  {
    return await  this.userService.paginateGetAllUsers(paginationDto)
  }

  @RoleGuardDecorator(RoleEnum.SUPERADMIN,RoleEnum.ADMIN,RoleEnum.SUPPORTER)
  @UseGuards(JwtGuard,RoleGuard)
  @Post('get/by/name')
  async getUserByUsername(@Body() username:string):Promise<any>
  {
    return await this.userService.getUserByUsername(username)
  }

  @RoleGuardDecorator(RoleEnum.ADMIN,RoleEnum.SUPERADMIN,RoleEnum.SUPPORTER)
  @UseGuards(JwtGuard,RoleGuard)
  @Get('get/:id')
  async getUserByID(@Param('id') user_id:string):Promise<any>
  {
    return await this.userService.getUserId(user_id)
  }

  @RoleGuardDecorator(RoleEnum.SUPERADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @Put('promote/user/to/admin/:id')
  async promoteUserToAdmin(@Param('id') user_id:string):Promise<any>
  {
    return await this.userService.promoteUserToAdmin(user_id)
  }

  @RoleGuardDecorator(RoleEnum.SUPERADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @Put('promote/admin/to/user/:id')
  async promoteAdminToUser(@Param('id') user_id:string):Promise<any>
  {
    return await this.userService.promoteAdminToUser(user_id)
  }

  @RoleGuardDecorator(RoleEnum.ADMIN,RoleEnum.SUPERADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @Put('promote/user/to/supporter/:id')
  async promoteUserToSupporter(@Param('id') user_id:string):Promise<any>
  {
    return await this.userService.promoteUserToSupporter(user_id)
  }

  @RoleGuardDecorator(RoleEnum.ADMIN,RoleEnum.SUPERADMIN)
  @UseGuards(RoleGuard,JwtGuard)
  @Put('promote/supporter/to/user')
  async promoteSupporterToUser(@Param('id') user_id:string):Promise<any>
  {
    return await this.userService.promoteSupporterToUser(user_id)
  }


  @Post('upload/profile/photo/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePhoto(@Param('id') user_id:string,@UploadedFile('file') file:Express.Multer.File):Promise<any>
  {
    return  await this.userService.uploadProfilePhoto(user_id,file)
  }

  @Get('pictures/:filename')
  async getPicture(@Param('filename') filename:string, @Res() res)
  {
    return await this.userService.getPicture(filename, res)
  }

  @Delete('profile/picture/:id')
  async deleteUserProfile(@Param('id') user_id:string):Promise<any>
  {
    return await this.userService.deleteUserProfile(user_id)
  }

  @Delete('truncate/user/entity')
  async truncateEntity():Promise<any>
  {
    return await  this.userService.truncateEntity()
  }

  @Get('sent/email/to/user/:id')
  async sentEmailToUser(@Param('id') user_id:string):Promise<any>
  {
    return await this.userService.sentValidationCodeToEmail(user_id)
  }

  @Post('sent/verification/code/:id')
  async verifyUserEmail(@Param('id') user_id:string ,@Body() verify_code:number):Promise<any>
  {
    return await this.userService.verifyUserEmail(user_id, verify_code)
  }

  @Get('middleware/test')
  async getMiddlewareTest():Promise<string>
  {
    return 'OK'
  }
}