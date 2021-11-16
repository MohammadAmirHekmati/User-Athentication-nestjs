import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRegisterDto } from '../dto/user-register.dto';
import { RoleEnum } from 'src/auth/role.enum';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';

@Injectable()
@EntityRepository(UserEntity)
export class UserReposiory extends Repository<UserEntity>{

  async userRegister(userRegisterDto:UserRegisterDto):Promise<UserEntity>
  {
    if(await this.findOne({where:{username:userRegisterDto.username}}))
      throw new ConflictException()

    if (userRegisterDto.password!==userRegisterDto.confirmpassword)
      throw new BadRequestException('Password is not equal with confirm password')

    const user=new UserEntity()
    user.username=userRegisterDto.username.toLowerCase()
    user.password=userRegisterDto.password
    user.email=userRegisterDto.email
    user.role=[RoleEnum.USER]
    const saved_user=this.save(user)
    return saved_user
  }

  async updateUserProfile(user_id:string,updateUserProfileDto:UpdateUserProfileDto):Promise<UserEntity>
  {
    const user=await this.findOne({where:{id:user_id,deleted:false}})
    if(!user)
      throw new NotFoundException('User NotFound')
    user.email=updateUserProfileDto.email
    user.password=updateUserProfileDto.password
    user.username=updateUserProfileDto.username
    const saved_user=await this.save(user)
    return saved_user
  }

}