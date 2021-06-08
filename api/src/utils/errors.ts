import {NextFunction} from "express";
import {HTTP_SERVER_ERROR} from "./constants";


export class HttpException extends Error {
  public message: string
  public statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.message = message
    this.statusCode = statusCode
  }
}


// Global method to process errors
export function processError(err: HttpException, next: NextFunction) {
  if (!err.statusCode) {
    err.statusCode = HTTP_SERVER_ERROR;
  }
  next(err);
}
