import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleGuard } from '../../auth/guard/role.guard';
import { RoleEnum } from '../../auth/role.enum';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id:string

  @Column()
  username:string

  @Column()
  email:string

  @Column()
  password:string

// {type:'enum', enum:RoleEnum,default:RoleEnum.USER}
// {type:'enum',enum:RoleEnum,default:RoleEnum.USER}
  @Column('enum',{array:true,enum:RoleEnum,nullable:true})
  role:RoleEnum[]

  @Column('simple-array',{nullable:true})
  profile:Array<string>

  @Column({default:false})
  deleted:boolean

  @Column({nullable:true})
  verifycode:number
}