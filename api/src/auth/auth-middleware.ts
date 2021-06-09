import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {AUTHORIZATION_HEADER, HTTP_NOT_AUTHENTICATED, HTTP_SERVER_ERROR} from "../utils/constants";
import {HttpException} from "../utils/errors";


export interface AuthRequest extends Request {
  userId: string;
  username: string;
  email: string;
}

interface AuthToken {
  userId: string;
  username: string;
  email: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authRequest = req as AuthRequest
  const authHeader = req.get(AUTHORIZATION_HEADER);
  if (!authHeader) {
    throw new HttpException('Not authenticated', HTTP_NOT_AUTHENTICATED);
  }

  // Authorization: Bearer some-token-here
  const token = authHeader.split(' ')[1];
  let authToken;
  try {
    const secret = process.env.APP_SECRET as string;
    authToken = jwt.verify(token, secret) as AuthToken;
  } catch (err) {
    err.statusCode = HTTP_SERVER_ERROR;
    throw err;
  }

  if (!authToken) {
    throw new HttpException('Not authenticated', HTTP_NOT_AUTHENTICATED);
  }
  authRequest.userId = authToken.userId;
  authRequest.username = authToken.username;
  authRequest.email = authToken.email;
  next();
}
