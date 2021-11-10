import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleGuard } from '../../auth/guard/role.guard';
import { RoleEnum } from '../../auth/role.enum';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id:string

  @Column()
  username:string

  @Column({nullable:true})
  email:string

  @Column()
  password:string

// {type:'enum', enum:RoleEnum,default:RoleEnum.USER}
  @Column({type:'enum', enum:RoleEnum,default:RoleEnum.USER,nullable:true})
  role:RoleEnum[]

  @Column({default:false})
  deleted:boolean
}