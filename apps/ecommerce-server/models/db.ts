import Sequelize, { Options } from 'sequelize';
import baseConfig from '../config/config';

const env = (process.env.NODE_ENV as keyof typeof baseConfig) || 'development';
const config = baseConfig[env] as Required<Options>;

const sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
    logQueryParameters: true,
  }
);

// sequelize.sync({ force: true });

const db = {
  sequelize,
  Sequelize,
};

export default db;
