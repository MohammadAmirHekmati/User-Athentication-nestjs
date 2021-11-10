import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty()
  username:string
  @ApiProperty()
  password:string
}