import { DataTypes, Model, Optional } from 'sequelize';

import db from './db';

export interface TagAttributes {
  id: number;
  title: string;
  color: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TagCreationAttributes extends Optional<TagAttributes, 'id'> {}

export interface TagInstance
  extends Model<TagAttributes, TagCreationAttributes>,
    TagAttributes {}

const Tag = db.sequelize.define<TagInstance>('Tag', {
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
  color: DataTypes.STRING,
});

Tag.associate = models => {
  // define association here
  Tag.belongsToMany(models.Task, {
    through: 'TaskTags',
    foreignKey: 'tag_id',
    onDelete: 'CASCADE',
  });
};

export default Tag;
