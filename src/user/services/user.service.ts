import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  Param, Res,
  UploadedFile,
} from '@nestjs/common';
import { UserRegisterDto } from '../dto/user-register.dto';
import { UserReposiory } from '../repository/user.reposiory';
import { UserEntity } from '../model/user.entity';
import { UserLoginDto } from '../dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { RoleEnum } from '../../auth/role.enum';
import { PaginationDto } from '../dto/pagination.dto';
import { UserPaginateQueryType } from '../query-type/user-paginate-query-type';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(private userReposiory:UserReposiory,
              private jwtService:JwtService,
              private mailerService:MailerService) {
  }

  async userRegister(userRegisterDto:UserRegisterDto):Promise<UserEntity>
  {
    const registeredUser=await this.userReposiory.userRegister(userRegisterDto);

    return
  }

  async userLogin(userLoginDto:UserLoginDto):Promise<any>
  {
    const {password,username}=userLoginDto;
    const loweUserName=username.toLowerCase();
    const user=await this.userReposiory.findOne({where:{username:loweUserName,password:password}});
    if(!user)
      throw new NotFoundException();
    const roles=await user.role;
    const payload={username,roles:roles};
    const token=await this.jwtService.sign(payload,{expiresIn:'2m'});
    return  token;
  }

  async updateUserProfile(user_id:string,updateUserProfileDto:UpdateUserProfileDto):Promise<UserEntity>
  {
    return await this.userReposiory.updateUserProfile(user_id,updateUserProfileDto);
  }

  async paginateGetAllUsers(paginationDto:PaginationDto):Promise<UserPaginateQueryType>
  {
    const {limit,page}=paginationDto;
    const skip=(page-1)*limit;
    const take=limit;
    const total=await this.userReposiory.count();
    const getAll=await this.userReposiory.find({skip:skip,take:take});
    const paginate_user:UserPaginateQueryType={
      data:getAll,
      limit:limit,
      page:page,
      total:total,
    };
    return await  paginate_user;
  }

  async getUserByUsername(username:string):Promise<UserEntity>
  {
    const user=await this.userReposiory.findOne({where:{username:username}});

    if(!user)
      throw new NotFoundException('User not found');

    return user;
  }

  async getUserId(user_id:string):Promise<UserEntity>
  {
    const user=await this.userReposiory.findOne({where:{id:user_id,deleted:false}});
      if (!user)
        throw new NotFoundException();
    return user;
  }

  async promoteUserToAdmin(user_id:string):Promise<UserEntity>
  {
    let user=await this.userReposiory.findOne({where:{id:user_id}});

    if(!user)
      throw new NotFoundException();

      if (user.role.includes(RoleEnum.ADMIN))
        throw new ConflictException('User Aleardy is Admin');

        user.role.push(RoleEnum.ADMIN);

    const saved_user=await this.userReposiory.save(user);
    return saved_user;
  }

  async promoteAdminToUser(user_id:string):Promise<UserEntity>
  {
    const user=await this.userReposiory.findOne({where:{id:user_id,deleted:false}});
    if(!user)
    throw new NotFoundException('User NotFound');

    const index=user.role.indexOf(RoleEnum.ADMIN);
    if(!index)
      throw new BadRequestException('User is not admin');

    user.role.splice(index,1);
    const saved_user=await this.userReposiory.save(user);
    return saved_user;
  }

  async promoteUserToSupporter(user_id:string):Promise<UserEntity>
  {
    const user=await this.userReposiory.findOne({where:{id:user_id,deleted:false}});
    if(!user)
      throw new NotFoundException('User NotFound');

    if (user.role.includes(RoleEnum.SUPPORTER))
      throw new ConflictException('User Aleardy is supporter');

    user.role.push(RoleEnum.SUPPORTER);
    const saved_user=await this.userReposiory.save(user);
    return saved_user;
  }

  async promoteSupporterToUser(user_id:string):Promise<UserEntity>
  {
    const user=await this.userReposiory.findOne({where:{id:user_id,deleted:false}});
      if(!user)
        throw new NotFoundException('User NotFound');

    if (!user.role.includes(RoleEnum.SUPPORTER))
      throw new BadRequestException('User is not Supporter');

    const index=user.role.indexOf(RoleEnum.SUPPORTER);
    user.role.splice(index,1);
    const saved=await this.userReposiory.save(user);
    return saved;
  }

  async uploadProfilePhoto(user_id:string,file:Express.Multer.File):Promise<any>
  {
    const user=await this.userReposiory.findOne({where:{id:user_id,deleted:false}});
    if(!user)
      throw new NotFoundException();

    if (!file)
      throw new BadRequestException()

    user.profile.push(file.originalname)
    const saved_user=await this.userReposiory.save(user)
    return saved_user
  }

  async getPicture(filename:string, res)
  {
    if (!filename)
      throw new BadRequestException()

    const response=res.sendFile(process.cwd()+'/uploaded-file/'+filename)
    return response
  }

  async deleteUserProfile(user_id:string):Promise<any>
  {
    const user=await this.userReposiory.findOne({where:{id:user_id,deleted:false}})
    if(!user)
      throw new NotFoundException()
    user.profile.pop()
    const saved_user=await this.userReposiory.save(user)
    return saved_user
  }

  async truncateEntity():Promise<string>
  {
    await this.userReposiory.clear()
    return  'Truncate succesfully...!'
  }

  async sentValidationCodeToEmail(userEmailAddress:string):Promise<any>
  {
    const validationCodes=[1,2,3,4,5,6,7,8,9]
    const randomElement = validationCodes[Math.floor(Math.random() * validationCodes.length)];
    const sentEmailResult=await this.mailerService.sendMail({
      to:userEmailAddress,
      from: 'mamadtest1153@gmail.com',
      subject: 'Hello dear user',
      text: `there is yourvalidation code ${randomElement}`,
    })

    return randomElement
  }

  async validateUserEmail(userCode:number):Promise<any>
  {
  }
}
