import Cart from './cart';
import Category from './category';
import Product from './product';
import ProductCategory from './product-category';
import User from './user';

const models = {
  Category,
  Cart,
  User,
  ProductCategory,
  Product,
};

export default models;

export type AppModels = typeof models;

Object.values(models).forEach(model => {
  if (model?.associate) {
    model.associate(models);
  }
});
