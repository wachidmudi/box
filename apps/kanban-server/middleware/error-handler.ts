import { NextFunction, Request, Response } from 'express';
import { ValidationErrorItem } from 'sequelize';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let errors = [];
  let statusCode = 500;

  if (process.env.NODE_ENV !== 'production') {
    console.log(err);
  }

  switch (err.name) {
    case 'JsonWebTokenError':
    case 'AuthenticationError':
      errors.push(err?.message || 'Authentication failed');
      statusCode = 401;
      break;
    case 'SequelizeValidationError':
      err.errors.forEach((error: ValidationErrorItem) =>
        errors.push(error.message)
      );
      statusCode = 400;
      break;
    case 'SequelizeUniqueConstraintError':
      errors.push('Email already exist');
      statusCode = 400;
      break;
    case 'SequelizeConnectionRefusedError':
      errors.push('Server connection refused');
      statusCode = 503;
      break;

    default:
      errors.push(err.msg || 'internal server error');
      statusCode = err.statusCode || 500;
      break;
  }

  res.status(statusCode).json({ errors });
}
