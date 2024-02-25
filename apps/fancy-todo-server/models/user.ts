import { DataTypes, Model, Optional } from 'sequelize';

import { hashPassword } from '../helpers/bcrypt';
import { getEmailName } from '../helpers/getEmailName';
import db from './db';

export interface UserAttributes {
  id: string;
  name: string | null;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const User = db.sequelize.define<UserInstance>(
  'User',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
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
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['password'],
      },
    },
    scopes: {
      withPassword: {},
    },
  }
);

User.addHook('beforeCreate', (user: UserInstance) => {
  if (!user.name) {
    user.name = getEmailName(user.email);
  }

  user.password = hashPassword(user.password);
});

User.associate = models => {
  // define association here
  User.hasMany(models.Todo, { foreignKey: 'user_id' });
};

export default User;
