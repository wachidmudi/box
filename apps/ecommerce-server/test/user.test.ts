import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../app';
import models from '../models';

const { User } = models;

let user = { email: 'alex@gmail.com', password: 'alexsecret' };

beforeAll(async () => {
  await User.create(user);
});

describe('User Login - Success', () => {
  test('Should send an object with key: msg & user', () => {
    return request(app)
      .post('/login')
      .send(user)
      .expect(200)
      .then(res => {
        expect(res.body.msg).toBe('user successfully logged in');
        expect(res.body.user).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            email: expect.any(String),
            access_token: expect.any(String),
          })
        );
      });
  });
});

describe('User Login - Failed', () => {
  test('Should send "invalid email or password", (Wrong password)', () => {
    return request(app)
      .post('/login')
      .send({ email: user.email, password: '' })
      .expect(400)
      .then(res => {
        expect(res.body.errors).toEqual(
          expect.arrayContaining([
            expect.stringContaining('invalid email or password'),
          ])
        );
      });
  });

  test('Should send "invalid email or password", (Email doesn\'t exist)', () => {
    return request(app)
      .post('/login')
      .send({ email: 'any@gmail.com', password: user.password })
      .expect(400)
      .then(res => {
        expect(res.body.errors).toEqual(
          expect.arrayContaining([
            expect.stringContaining('invalid email or password'),
          ])
        );
      });
  });

  test('Should send "invalid email or password", (Doesn\'t provide Email & Password)', () => {
    return request(app)
      .post('/login')
      .send({ email: '', password: '' })
      .expect(400)
      .then(res => {
        expect(res.body.errors).toEqual(
          expect.arrayContaining([
            expect.stringContaining('invalid email or password'),
          ])
        );
      });
  });
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
});
