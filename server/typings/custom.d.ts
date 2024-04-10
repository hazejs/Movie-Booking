import { Request, Express } from 'express';
import { IUser } from '../models/user.model';

declare module Express {
  interface Request {
    user?: IUser;
  }
}
