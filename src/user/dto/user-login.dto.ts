import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(15,{message:'Max length of this parametr should be 15 char'})
  @MinLength(3,{message:'Min length of this char should be 3 char'})
  username:string

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(15,{message:'Max length of this parametr should be 15 char'})
  @MinLength(8,{message:'Min length of this char should be 8 char'})
  password:string
}