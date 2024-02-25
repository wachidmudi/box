import { DataTypes, Model, Optional } from 'sequelize';

import db from './db';

import { currentDate } from '../helpers/date';

const status = ['next', 'progress', 'done'] as const;
type Status = (typeof status)[number];

export interface TodoAttributes {
  id: string;
  title: string;
  description: string | null;
  status: Status;
  due_date: Date;
  image_url: string | null;
  color: string | null;
  user_id: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, 'id'> {}

export interface TodoInstance
  extends Model<TodoAttributes, TodoCreationAttributes>,
    TodoAttributes {}

const Todo = db.sequelize.define<TodoInstance>('Todo', {
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
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM,
    values: status,
    validate: {
      notEmpty: {
        msg: 'Status is required',
      },
      isIn: {
        args: [status],
        msg: "Status must be either 'next', 'progress' or 'done'",
      },
    },
  },
  due_date: {
    allowNull: false,
    type: DataTypes.DATE,
    validate: {
      notEmpty: {
        msg: 'Due Date is required',
      },
      isDate: {
        args: true,
        msg: 'Wrong date format',
      },
      isAfter: {
        args: currentDate(),
        msg: 'Date must be after this day',
      },
    },
  },
  image_url: DataTypes.STRING,
  color: DataTypes.STRING,
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
});

Todo.associate = models => {
  // define association here
  Todo.belongsTo(models.User, { foreignKey: 'user_id' });
};

export default Todo;
