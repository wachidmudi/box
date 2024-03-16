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

Category.associate = models => {
  // define association here
  Category.belongsToMany(models.Product, {
    as: 'products',
    through: 'ProductCategories',
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export default Category;
