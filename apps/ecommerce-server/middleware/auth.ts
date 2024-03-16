import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers/jwt';
import { AuthenticationError } from '../lib/errors';
import models from '../models';

const { User, Product, Cart } = models;

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw new AuthenticationError('Invalid user session');
    }

    const session = verifyToken(access_token as string);

    if (typeof session !== 'object') {
      throw new AuthenticationError('Invalid user session');
    }

    const user = await User.findOne({
      where: { email: session.email },
    });

    if (!user) {
      throw new AuthenticationError('Invalid user credentials');
    }

    req.userData = {
      ...session,
      role: user.role,
    };

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

  Product.findByPk(id)
    .then(product => {
      if (!product) {
        throw { msg: 'Product not found', status: 404 };
      }
      if (product) {
        return next();
      }

      throw new AuthenticationError('User not authorized');
    })
    .catch(next);
}

export async function authorizationCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  Cart.findByPk(id)
    .then(cart => {
      if (!cart) {
        throw { msg: 'Cart not found', status: 404 };
      }
      if (cart.userId == req.userData.id) {
        return next();
      }

      throw new AuthenticationError('User not authorized');
    })
    .catch(next);
}

export function authAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.userData.role == 'admin') {
    return next();
  }

  next(new AuthenticationError("User doesn't have permission"));
}

export function authCustomer(req: Request, res: Response, next: NextFunction) {
  if (req.userData.role == 'customer') {
    return next();
  }

  next(new AuthenticationError("User doesn't have permission"));
}
