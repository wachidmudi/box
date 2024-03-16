import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers/jwt';
import { AuthenticationError } from '../lib/errors';
import models from '../models';

const { Task, User } = models;

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * Must wrap verifyToken inside try catch
   * to catch the error, as the docs said
   */
  try {
    const { token } = req.headers;
    const session = verifyToken(token as string);

    if (typeof session !== 'object') {
      throw new AuthenticationError('Invalid user session');
    }

    const user = await User.findOne({
      where: { email: session.email },
    });

    if (!user) {
      throw new AuthenticationError('Invalid user credentials');
    }

    // attach decoded object data into req.userData
    req.userData = session;
    if (user.role) {
      req.userRole = user.role;
    }

    next();
  } catch (err) {
    next(err);
  }
}

export async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  Task.findByPk(id)
    .then(task => {
      if (!task) {
        throw { msg: 'Task not found', statusCode: 404 };
      }

      if (task.user_id == req.userData.user_id) {
        return next();
      }

      throw new AuthenticationError('User not authorized');
    })
    .catch(next);
}

export async function authRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userRole } = req;

    if (userRole != 'admin') {
      throw new AuthenticationError("User doesn't have permission");
    }

    next();
  } catch (err) {
    next(err);
  }
}
