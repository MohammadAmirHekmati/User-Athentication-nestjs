import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserReposiory } from './repository/user.reposiory';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfiguartionService } from '../auth/jwt-configuartion.service';
import { MulterModule } from '@nestjs/platform-express';
import { UploadFileConfigService } from '../uploadfile/upload-file.config.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TestMiddleware } from './middlewares/test.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([UserReposiory]),
  JwtModule.registerAsync({useClass:JwtConfiguartionService}),
  MulterModule.registerAsync({useClass:UploadFileConfigService}),
  ScheduleModule.forRoot()
  ],
  providers:[UserService],
  controllers:[UserController]
})
export class UserModule implements NestModule
{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(TestMiddleware)
      .forRoutes({path:'user/middleware/test',method:RequestMethod.GET})
  }

}
