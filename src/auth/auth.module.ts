import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfiguartionService } from './jwt-configuartion.service';
import { JwtGuard } from './guard/jwt.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RoleGuard } from './guard/role.guard';


@Module({
  imports:[JwtModule.registerAsync({useClass:JwtConfiguartionService})],
  providers:[JwtModule,JwtStrategy,RoleGuard]
})
export class AuthModule {}
