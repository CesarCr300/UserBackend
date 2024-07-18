import { HttpException } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  public isCustomException = true;
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }

  static isCustomHttpException(exception: any): boolean {
    return exception.isCustomException || false;
  }
}
