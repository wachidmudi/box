import { DataTypes, Model, Optional } from 'sequelize';

import db from './db';

export interface CategoryAttributes {
  id: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, 'id'> {}

export interface CategoryInstance
  extends Model<CategoryAttributes, CategoryCreationAttributes>,
    CategoryAttributes {}

const Category = db.sequelize.define<CategoryInstance>('Category', {
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
});

Category.addScope(
  'defaultScope',
  {
    order: [['id', 'ASC']],
  },
  { override: true }
);

Category.associate = models => {
  // define association here
  Category.hasMany(models.Task, { foreignKey: 'category_id' });
};

export default Category;
