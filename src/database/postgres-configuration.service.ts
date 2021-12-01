import { TypeOrmOptionsFactory,TypeOrmModuleOptions } from '@nestjs/typeorm';


export class PostgresConfigurationService implements TypeOrmOptionsFactory{
  createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const option:TypeOrmModuleOptions={
      type:'postgres',
      username:'postgres',
      password:'11538832',
      host:'localhost',
      port:5433,
      database:'jwt-practice-new',
      entities:[__dirname+'/../**/*.entity{.ts,.js}'],
      synchronize:true
    }
    return option
  }

}
