import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConfigurationService } from './postgres-configuration.service';
const config=require('config')
const dbConfiguation=config.get('db')

@Module({
  imports:[TypeOrmModule.forRoot(dbConfiguation)]
})
export class DatabaseModule {}
