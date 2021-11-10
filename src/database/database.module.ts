import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigurationService } from './postgres-configuration.service';

@Module({
  imports:[TypeOrmModule.forRootAsync({useClass:PostgresConfigurationService})]
})
export class DatabaseModule {}
