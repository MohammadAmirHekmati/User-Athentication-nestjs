import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorsUserNotFound extends HttpException{

  constructor() {
    super('User Is Not Found In Database',HttpStatus.NOT_FOUND);
  }
}

export class ErrorsPoviderDontHaveAccess extends HttpException{

  constructor() {
    super('Provider Do Not Have Access',HttpStatus.NOT_FOUND);
  }
}
