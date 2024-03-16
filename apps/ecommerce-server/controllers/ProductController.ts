import { NextFunction, Request, Response } from 'express';

import models from '../models';

const { Product, Category } = models;

type ProductBody = {
  name: string;
  description: string;
  image_url: string;
  price: number;
  stock: number;
  categories: number[];
};

class ProductController {
  static async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;

      const options = {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      };

      const optionWithFilter = {
        ...options,
        where: { id },
      };

      const products = await Product.findAll({
        include: id ? optionWithFilter : options,
        order: [['updatedAt', 'DESC']],
      });

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getOneProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      });

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async postProduct(
    req: Request<{}, {}, ProductBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, description, image_url, price, stock, categories } =
        req.body;
      const product = await Product.create({
        name,
        description,
        image_url,
        price,
        stock,
      });
      // @ts-expect-error
      await product.addCategories(categories);

      res.status(201).json({ msg: 'product successfully created', product });
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(
    req: Request<{ id: string }, {}, ProductBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { name, description, image_url, price, stock, categories } =
        req.body;

      const product = await Product.findByPk(id);
      if (!product) {
        throw { msg: 'Product is not found', status: 404 };
      }

      await product.update(
        { name, description, image_url, price, stock },
        {
          where: { id },
        }
      );

      if (Array.isArray(categories)) {
        await product.setCategories(categories);
      }

      res.status(200).json({ msg: 'product successfully updated', product });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);
      if (!product) {
        throw { msg: 'Product is not found', status: 404 };
      }

      await product.destroy();

      await product.setCategories([]);

      res.status(200).json({ msg: 'product successfully deleted', product });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
