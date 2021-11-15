import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRegisterDto } from '../dto/user-register.dto';
import { UserReposiory } from '../repository/user.reposiory';
import { UserEntity } from '../model/user.entity';
import { UserLoginDto } from '../dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { RoleEnum } from '../../auth/role.enum';
import { PaginationDto } from '../dto/pagination.dto';
import { UserPaginateQueryType } from '../query-type/user-paginate-query-type';

@Injectable()
export class UserService {
  constructor(private userReposiory:UserReposiory,
              private jwtService:JwtService) {
  }

  async userRegister(userRegisterDto:UserRegisterDto):Promise<UserEntity>
  {
    return  await this.userReposiory.userRegister(userRegisterDto);
  }

  async userLogin(userLoginDto:UserLoginDto):Promise<any>
  {
    const {password,username}=userLoginDto;
    const loweUserName=username.toLowerCase()
    const user=await this.userReposiory.findOne({where:{username:loweUserName,password:password}});
    if(!user)
      throw new NotFoundException();
    const roles=await user.role;
    const payload={username,roles:roles};
    const token=await this.jwtService.sign(payload);
    return  token;
  }

  async getAllUser():Promise<UserEntity[]>
  {
    const users=await this.userReposiory.find({where:{deleted:false}})
    return users
  }

  async paginateGetAllUsers(paginationDto:PaginationDto):Promise<UserPaginateQueryType>
  {
    const {limit,page}=paginationDto
    const skip=(page-1)*limit
    const take=limit
    const total=await this.userReposiory.count()
    const getAll=await this.userReposiory.find({skip:skip,take:take})
    const paginate_user:UserPaginateQueryType={
      data:getAll,
      limit:limit,
      page:page,
      total:total
    }
    return await  paginate_user
  }

  async getUserByUsername(username:string):Promise<UserEntity>
  {
    const user=await this.userReposiory.findOne({where:{username:username}})

    if(!user)
      throw new NotFoundException('User not found')

    return user
  }

  async getUserId(user_id:string):Promise<UserEntity>
  {
    const user=await this.userReposiory.findOne({where:{id:user_id,deleted:false}})
      if (!user)
        throw new NotFoundException()
    return user
  }

  async promoteUserToAdmin(user_id:string):Promise<UserEntity>
  {
    let user=await this.userReposiory.findOne({where:{id:user_id}});

    if(!user)
      throw new NotFoundException();

      if (user.role.includes(RoleEnum.ADMIN))
        throw new ConflictException('User Aleardy is Admin');

        user.role.push(RoleEnum.ADMIN)

    const saved_user=await this.userReposiory.save(user)
    return saved_user
  }

  async promoteAdminToUser(user_id:string):Promise<UserEntity>
  {
    const user=await this.userReposiory.findOne({where:{id:user_id,deleted:false}})
    if(!user)
    throw new NotFoundException('User NotFound')

    const index=user.role.indexOf(RoleEnum.ADMIN)
    if(!index)
      throw new BadRequestException('User is not admin')

    user.role.splice(index,1)
    const saved_user=await this.userReposiory.save(user)
    return saved_user
  }

  async promoteUserToSupporter(user_id:string):Promise<UserEntity>
  {
    const user=await this.userReposiory.findOne({where:{id:user_id,deleted:false}})
    if(!user)
      throw new NotFoundException('User NotFound')

    if (user.role.includes(RoleEnum.SUPPORTER))
      throw new ConflictException('User Aleardy is supporter')

    user.role.push(RoleEnum.SUPPORTER)
    const saved_user=await this.userReposiory.save(user)
    return saved_user
  }

  async promoteSupporterToUser(user_id:string):Promise<UserEntity>
  {
    const user=await this.userReposiory.findOne({where:{id:user_id,deleted:false}})
      if(!user)
        throw new NotFoundException('User NotFound')

    if (!user.role.includes(RoleEnum.SUPPORTER))
      throw new BadRequestException('User is not Supporter')

    const index=user.role.indexOf(RoleEnum.SUPPORTER)
    user.role.splice(index,1)
    const saved=await this.userReposiory.save(user)
    return saved
  }
}
