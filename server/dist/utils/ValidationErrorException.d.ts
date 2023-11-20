import { HttpException } from "@nestjs/common";
export declare class ValidationErrorException extends HttpException {
    constructor(message: string);
}
