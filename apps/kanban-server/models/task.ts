import { DataTypes, Model, Optional } from 'sequelize';

import db from './db';

export interface TaskAttributes {
  id: number;
  title: string;
  description: string | null;
  user_id: number | null;
  category_id: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

export interface TaskInstance
  extends Model<TaskAttributes, TaskCreationAttributes>,
    TaskAttributes {}

const Task = db.sequelize.define<TaskInstance>('Task', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'Title is required',
      },
    },
  },
  description: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
  category_id: DataTypes.INTEGER,
});

Task.addHook('afterCreate', (task: TaskInstance) => {
  task.reload();
});

Task.addScope(
  'defaultScope',
  {
    order: [['id', 'DESC']],
  },
  { override: true }
);

Task.associate = models => {
  // define association here
  Task.belongsTo(models.User, { foreignKey: 'user_id' });
  Task.belongsTo(models.Category, { foreignKey: 'category_id' });
  Task.belongsToMany(models.Tag, {
    through: 'TaskTags',
    foreignKey: 'task_id',
    onDelete: 'CASCADE',
  });
};

export default Task;
