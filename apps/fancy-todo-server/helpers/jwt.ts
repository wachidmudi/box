import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

if (!secret) {
  throw new Error('SECRET is required');
}

export function generateToken(payload: Parameters<typeof jwt.sign>[0]) {
  return jwt.sign(payload, secret as string);
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret as string);
}
