import bcrypt from 'bcryptjs';

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function compareHash(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}
