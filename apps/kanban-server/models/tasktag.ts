import { DataTypes, Model } from 'sequelize';

import db from './db';

export interface TaskTagAttributes {
  task_id: number;
  tag_id: number;
}

interface TaskTagCreationAttributes extends TaskTagAttributes {}

export interface TaskTagInstance
  extends Model<TaskTagAttributes, TaskTagCreationAttributes>,
    TaskTagAttributes {}

const TaskTag = db.sequelize.define<TaskTagInstance>('TaskTag', {
  task_id: DataTypes.INTEGER,
  tag_id: DataTypes.INTEGER,
});

export default TaskTag;
