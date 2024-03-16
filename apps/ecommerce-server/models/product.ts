import {
  BelongsToManyAddAssociationMixin,
  BelongsToManySetAssociationsMixin,
  DataTypes,
  HasManySetAssociationsMixin,
  Model,
  Optional,
} from 'sequelize';

import { CartInstance } from './cart';
import { CategoryInstance } from './category';
import db from './db';

export interface ProductAttributes {
  id: number;
  name: string;
  description: string | null;
  image_url: string;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

export interface ProductInstance
  extends Model<ProductAttributes, ProductCreationAttributes>,
    ProductAttributes {
  addCarts: HasManySetAssociationsMixin<CartInstance, number>;
  addCategories: BelongsToManyAddAssociationMixin<CategoryInstance, number>;
  setCategories: BelongsToManySetAssociationsMixin<CategoryInstance, number>;
}

const Product = db.sequelize.define<ProductInstance>('Product', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is required',
      },
      notNull: {
        msg: 'Name is required',
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Image url is required',
      },
      notNull: {
        msg: 'Image url is required',
      },
      isUrl: {
        msg: 'Image url format is not valid',
      },
    },
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Price is required',
      },
      notNull: {
        msg: 'Price is required',
      },
      min: {
        args: [0],
        msg: "Price value can't be negative",
      },
      isNumeric: {
        msg: 'Price value must be number',
      },
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Stock is required',
      },
      notNull: {
        msg: 'Stock is required',
      },
      min: {
        args: [0],
        msg: "Stock value can't be negative",
      },
      isNumeric: {
        msg: 'Stock value must be number',
      },
    },
  },
});

Product.associate = models => {
  // define association here
  Product.belongsToMany(models.Category, {
    as: 'categories',
    through: 'ProductCategories',
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Product.hasMany(models.Cart, { foreignKey: 'productId' });
};

export default Product;
