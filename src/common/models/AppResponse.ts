import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';
import AppError, { CustomErrorCode } from './AppError';

export enum MessageType {
  // 200 201
  SUCCESS = 'SUCCESS',
  // 400
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  BAD_REQUEST = 'BAD_REQUEST',
  // 401
  UNAUTHORIZED = 'AUTHENTICATION_FAILED',
  // 403
  FORBIDDEN = 'FORBIDDEN',
  // 404
  NOT_FOUND = 'NOT_FOUND',
  // 409
  CONFLICT = 'CONFLICT',
  // 500
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export default class AppResponse<T> {
  success: boolean;
  message: MessageType;
  error?: AppError;
  data?: T;

  constructor(
    success: boolean,
    message: MessageType,
    error?: AppError,
    data?: T,
  ) {
    this.success = success;
    this.message = message;
    this.error = error;
    this.data = data;
  }

  static ok<T = any>(data?: T): AppResponse<T> {
    return new AppResponse(true, MessageType.SUCCESS, undefined, data);
  }

  static badRequest(
    errorMessages: string[],
    errorCode?: CustomErrorCode,
  ): HttpException {
    return new HttpException(
      new AppResponse(false, MessageType.BAD_REQUEST, {
        messages: errorMessages,
        errorCode: errorCode || HttpStatus.BAD_REQUEST,
      }),
      HttpStatus.BAD_REQUEST,
    );
  }

  static validationFailed(
    errorMessages: string[],
    errorCode?: CustomErrorCode,
  ): HttpException {
    return new HttpException(
      new AppResponse(false, MessageType.VALIDATION_FAILED, {
        messages: errorMessages,
        errorCode: errorCode || HttpStatus.BAD_REQUEST,
      }),
      HttpStatus.BAD_REQUEST,
    );
  }

  static validationFailedFromValidatorErrors(
    errors: ValidationError[],
  ): HttpException {
    const errorMessages: string[] = [];
    errors.forEach((err) =>
      errorMessages.push(...Object.values(err.constraints)),
    );
    return new HttpException(
      new AppResponse(false, MessageType.VALIDATION_FAILED, {
        messages: errorMessages,
        errorCode: HttpStatus.BAD_REQUEST,
      }),
      HttpStatus.BAD_REQUEST,
    );
  }

  static authenticationFailed(
    errorMessages: string[],
    errorCode?: CustomErrorCode,
  ): HttpException {
    return new HttpException(
      new AppResponse(false, MessageType.UNAUTHORIZED, {
        messages: errorMessages,
        errorCode: errorCode || HttpStatus.UNAUTHORIZED,
      }),
      HttpStatus.UNAUTHORIZED,
    );
  }

  static forbidden(
    errorMessages: string[],
    errorCode?: CustomErrorCode,
  ): HttpException {
    return new HttpException(
      new AppResponse(false, MessageType.FORBIDDEN, {
        messages: errorMessages,
        errorCode: errorCode || HttpStatus.FORBIDDEN,
      }),
      HttpStatus.FORBIDDEN,
    );
  }

  static notFound(
    errorMessages: string[],
    errorCode?: CustomErrorCode,
  ): HttpException {
    return new HttpException(
      new AppResponse(false, MessageType.NOT_FOUND, {
        messages: errorMessages,
        errorCode: errorCode || HttpStatus.NOT_FOUND,
      }),
      HttpStatus.NOT_FOUND,
    );
  }

  static conflict(
    errorMessages: string[],
    errorCode?: CustomErrorCode,
  ): HttpException {
    return new HttpException(
      new AppResponse(false, MessageType.CONFLICT, {
        messages: errorMessages,
        errorCode: errorCode || HttpStatus.CONFLICT,
      }),
      HttpStatus.CONFLICT,
    );
  }

  static internalServerError(
    errorMessages: string[],
    errorCode?: CustomErrorCode,
  ): HttpException {
    return new HttpException(
      new AppResponse(false, MessageType.INTERNAL_SERVER_ERROR, {
        messages: errorMessages,
        errorCode: errorCode || HttpStatus.INTERNAL_SERVER_ERROR,
      }),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
