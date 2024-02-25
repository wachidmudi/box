import Todo from './todo';
import User from './user';

const models = {
  Todo,
  User,
};

export default models;

export type AppModels = typeof models;

Object.values(models).forEach(model => {
  if (model?.associate) {
    model.associate(models);
  }
});
