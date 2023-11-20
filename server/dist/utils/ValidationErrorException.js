"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorException = void 0;
const common_1 = require("@nestjs/common");
class ValidationErrorException extends common_1.HttpException {
    constructor(message) {
        super({ message, status: common_1.HttpStatus.BAD_REQUEST }, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.ValidationErrorException = ValidationErrorException;
//# sourceMappingURL=ValidationErrorException.js.map