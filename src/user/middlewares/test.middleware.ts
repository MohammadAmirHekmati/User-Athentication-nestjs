import { Logger, NestMiddleware } from '@nestjs/common';

export class TestMiddleware implements NestMiddleware{
  private logger=new Logger()

  use(req: any, res: any, next: () => void): any {
  const remoteAddress=req.connection.remoteAddress
    this.logger.log(remoteAddress)
    next()
  }

}