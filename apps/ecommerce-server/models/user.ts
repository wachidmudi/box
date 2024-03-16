import { DataTypes, Model, Optional } from 'sequelize';

import { generateHash } from '../helpers/bcrypt';
import db from './db';

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const User = db.sequelize.define<UserInstance>('User', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Email is required',
      },
      isEmail: {
        msg: 'Email format is not valid',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Password is required',
      },
      len: {
        args: [6, 32],
        msg: 'Password length must be within 6 until 32',
      },
    },
  },
  role: DataTypes.STRING,
});

User.addHook('beforeCreate', (user: UserInstance) => {
  user.password = generateHash(user.password);
  if (!user.role) {
    user.role = 'customer';
  }
});

export default User;
