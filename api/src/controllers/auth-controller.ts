import {HttpException, processError} from "../utils/errors";
import {validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {NextFunction, Request, Response} from "express";
import {
  HTTP_CREATED,
  HTTP_NOT_AUTHENTICATED,
  HTTP_OK,
  HTTP_UNPROCESSABLE_ENTITY,
  JWT_TOKEN_DURATION
} from "../utils/constants";
import {IUser} from "../models/models";

const {User} = require('../models/models');


export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    // validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // error.data = errors.array();
      throw new HttpException('Validation failed', HTTP_UNPROCESSABLE_ENTITY);
    }
    // hash password and persist user
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({username: username, email: email, password: hashedPassword});

    return res.status(HTTP_CREATED).json({
      user: {
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    processError(err, next);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    // validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // error.data = errors.array();
      throw new HttpException('Validation failed', HTTP_UNPROCESSABLE_ENTITY);
    }
    // check user and password
    const user: IUser = await User.findOne({username: req.body.username});
    await checkPassword(req.body.password, user);

    if (user) {
      // create and return token
      const token = createToken(user);
      return res.status(HTTP_OK).json({id: user._id, token: token});
    } else {
      return res.status(HTTP_NOT_AUTHENTICATED).json({});
    }
  } catch (err) {
    processError(err, next);
  }
}

async function checkPassword(password: string, user: IUser) {
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new HttpException('Wrong password!', HTTP_NOT_AUTHENTICATED);
  }
}

function createToken(user: IUser) {
  const secret = process.env.APP_SECRET as string;
  return jwt.sign(
    {userId: user._id, username: user.username, email: user.email},
    secret,
    {expiresIn: JWT_TOKEN_DURATION}
  );
}
