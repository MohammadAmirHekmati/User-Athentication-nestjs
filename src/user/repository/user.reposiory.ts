import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../dto/user-register.dto';
import { RoleEnum } from 'src/auth/role.enum';

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

}