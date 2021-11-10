import {JwtOptionsFactory,JwtModuleOptions} from '@nestjs/jwt'
export class JwtConfiguartionService implements JwtOptionsFactory{
  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    const options:JwtModuleOptions={
      secret:'11538832',
      signOptions:{
        // expiresIn:'3600s',
        algorithm:'HS256'

      }
    }
    return options
  }

}