import Category from './category';
import Tag from './tag';
import Task from './task';
import TaskTag from './tasktag';
import User from './user';

const models = {
  Tag,
  User,
  Task,
  Category,
  TaskTag,
};

export default models;

export type AppModels = typeof models;

Object.values(models).forEach(model => {
  if (model?.associate) {
    model.associate(models);
  }
});
