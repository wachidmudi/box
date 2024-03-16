import { DataTypes, Model, Optional } from 'sequelize';

import db from './db';

export interface CartAttributes {
  id: number;
  userId: number | null;
  productId: number | null;
  quantity: number;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {}

export interface CartInstance
  extends Model<CartAttributes, CartCreationAttributes>,
    CartAttributes {}

const Cart = db.sequelize.define<CartInstance>('Cart', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  userId: DataTypes.INTEGER,
  productId: DataTypes.INTEGER,
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Quantity is required',
      },
      notEmpty: {
        msg: 'Quantity is required',
      },
      isNumeric: {
        msg: 'Quantity value must be number',
      },
    },
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Status is required',
      },
      notEmpty: {
        msg: 'Status is required',
      },
    },
    defaultValue: false,
  },
});

Cart.associate = models => {
  // define association here
  Cart.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' });
};

export default Cart;
