import { NextFunction, Request, Response } from 'express';

import { OAuth2Client } from 'google-auth-library';
import models from '../models';

import { compareHash } from '../helpers/bcrypt';
import { generateToken } from '../helpers/jwt';

const { User } = models;

class UsersController {
  static register(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;

    User.create({ name, email, password })
      .then(data => {
        res.status(201).json({
          id: data.id,
          email: data.email,
          msg: 'register success',
        });
      })
      .catch(next);
  }

  static login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw { msg: 'Email and password is required' };
    }

    User.findOne({
      where: { email },
    })
      .then(data => {
        if (!data) {
          throw { msg: 'Invalid email or password', statusCode: 400 };
        }
        if (!compareHash(password, data.password)) {
          throw { msg: 'Invalid email or password', statusCode: 400 };
        }

        const payload = {
          user_id: data.id,
          email: data.email,
        };

        const token = generateToken(payload);

        const user = {
          name: data.name,
          organization: data.organization,
          token,
        };

        res.status(200).json({ msg: 'login success', user });
      })
      .catch(next);
  }

  static googleSignIn(req: Request, res: Response, next: NextFunction) {
    const { googleToken } = req.body;

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_SECRET);
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_SECRET,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new Error('OAuth: Invalid Google verification ID');
      }

      let data = await User.findOne({
        where: { email: payload.email },
      });

      if (!data) {
        if (!payload.email) {
          throw new Error('OAuth: Scope email is not enabled');
        }

        data = await User.create({
          name: payload.name,
          email: payload.email,
          password: 'googleSignIn' + Math.random(),
        });
      }

      const objUser = {
        user_id: data.id,
        email: payload.email,
      };

      const token = generateToken(objUser);

      const user = {
        name: data.name,
        organization: data.organization,
        token,
      };

      res.status(200).json({ msg: 'login success', user });
    }
    verify().catch(next);
  }
}

export default UsersController;
