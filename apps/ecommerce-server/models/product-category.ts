import { DataTypes, Model } from 'sequelize';

import db from './db';

export interface ProductCategoryAttributes {
  product_id: number | null;
  category_id: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCategoryCreationAttributes extends ProductCategoryAttributes {}

export interface ProductCategoryInstance
  extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes>,
    ProductCategoryAttributes {}

const ProductCategory = db.sequelize.define<ProductCategoryInstance>(
  'ProductCategory',
  {
    product_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
  }
);

export default ProductCategory;
