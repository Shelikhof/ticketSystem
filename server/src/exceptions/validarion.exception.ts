import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidationException extends HttpException {
  messages;

  constructor(response) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: response,
      },
      HttpStatus.BAD_REQUEST
    );
    this.messages = response;
  }
}
