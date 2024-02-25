import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers/jwt';
import { AuthenticationError } from '../lib/errors';
import models from '../models';

const { Todo, User } = models;

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /**
   * Must wrap verifyTOken inside try catch
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
      throw new AuthenticationError();
    }

    // attach decoded object data into req.userData
    req.userData = session;

    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Check if todo belongs to current user
 */
export async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  Todo.findByPk(id)
    .then(todo => {
      if (!todo) {
        throw { msg: 'Todo not found', statusCode: 404 };
      }

      if (todo.user_id == req.userData.id) {
        return next();
      }

      throw new AuthenticationError();
    })
    .catch(next);
}
