import { NextFunction, Request, Response } from 'express';

import { compareHash } from '../helpers/bcrypt';
import { generateToken } from '../helpers/jwt';
import models from '../models';

const { User } = models;

class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await User.create({ email, password });
      const payload = {
        id: user.id,
        email: user.email,
      };

      res
        .status(201)
        .json({ msg: 'user successfully registered', user: payload });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { msg: 'invalid email or password', status: 400 };
      }

      const verifyPassword = compareHash(password, user.password);

      if (!verifyPassword) {
        throw { msg: 'invalid email or password', status: 400 };
      }

      const payload = {
        id: user.id,
        email: user.email,
      };

      const access_token = generateToken(payload);

      res.status(200).json({
        msg: 'user successfully logged in',
        user: {
          ...payload,
          access_token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
