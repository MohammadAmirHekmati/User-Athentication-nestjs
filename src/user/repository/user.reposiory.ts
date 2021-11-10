import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../dto/user-register.dto';

@Injectable()
@EntityRepository(UserEntity)
export class UserReposiory extends Repository<UserEntity>{

  async userRegister(userRegisterDto:UserRegisterDto):Promise<UserEntity>
  {
    if(await this.findOne({where:{username:userRegisterDto.username}}))
      throw new ConflictException()

    const user=new UserEntity()
    user.username=userRegisterDto.username.toLowerCase()
    user.password=userRegisterDto.password
    const saved_user=this.save(user)
    return saved_user
  }

}