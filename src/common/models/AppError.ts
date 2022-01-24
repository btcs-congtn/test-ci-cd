import { HttpStatus } from '@nestjs/common';

export enum CustomErrorCode {
  SIP_ACCOUNT_NOT_FOUND = 1101,
}

export default interface AppError {
  // represent the detail of the error
  messages: string[];
  errorCode: HttpStatus | CustomErrorCode;
}
