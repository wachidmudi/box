import { JwtPayload } from 'jsonwebtoken';

/**
 * @see https://stackoverflow.com/a/66714317
 */
declare module 'express-serve-static-core' {
  interface Request {
    userData: JwtPayload;
  }
}
