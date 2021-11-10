import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserReposiory } from './repository/user.reposiory';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfiguartionService } from '../auth/jwt-configuartion.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserReposiory]),
  JwtModule.registerAsync({useClass:JwtConfiguartionService})
  ],
  providers:[UserService],
  controllers:[UserController]
})
export class UserModule {}
