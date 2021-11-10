import { UserEntity } from '../model/user.entity';

export class UserPaginateQueryType {
  data:UserEntity[]
  limit:number
  page:number
  total:number
}