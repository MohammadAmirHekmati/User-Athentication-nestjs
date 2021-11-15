import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
export class UserRegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(15,{message:'Max length of this parametr should be 15 char'})
  @MinLength(3,{message:'Min length of this char should be 3 char'})
  username:string

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(15,{message:'Max length of this parametr should be 15 char'})
  @MinLength(8,{message:'Min length of this char should be 8 char'})
  password:string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsDefined()
  email:string

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(15,{message:'Max length of this parametr should be 15 char'})
  @MinLength(8,{message:'Min length of this char should be 8 char'})
  confirmpassword:string


}