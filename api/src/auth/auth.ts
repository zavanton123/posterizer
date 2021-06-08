import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {AUTHORIZATION_HEADER, HTTP_NOT_AUTHENTICATED, HTTP_SERVER_ERROR} from "../utils/constants";
import {HttpException} from "../utils/errors";

const {APP_SECRET} = process.env;



export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.get(AUTHORIZATION_HEADER);
  if (!authHeader) {
    throw new HttpException('Not authenticated', HTTP_NOT_AUTHENTICATED);
  }

  // Authorization: Bearer some-token-here
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, APP_SECRET);
  } catch (err) {
    err.statusCode = HTTP_SERVER_ERROR;
    throw err;
  }

  if (!decodedToken) {
    throw new HttpException('Not authenticated', HTTP_NOT_AUTHENTICATED);
  }
  req.userId = decodedToken.userId;
  req.username = decodedToken.username;
  req.email = decodedToken.email;
  next();
}
