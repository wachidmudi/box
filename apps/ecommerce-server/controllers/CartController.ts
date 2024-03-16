import { NextFunction, Request, Response } from 'express';
import models from '../models';

const { Cart, Product } = models;

class CartController {
  static async getCarts(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.userData;

      const carts = await Cart.findAll({
        where: {
          userId: id,
          status: false,
        },
        include: {
          model: Product,
          as: 'product',
        },
      });

      res.status(200).json(carts);
    } catch (error) {
      next(error);
    }
  }

  static async addCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.userData;
      const { productId } = req.body;

      const product = await Product.findByPk(productId);

      if (!product) {
        throw { msg: 'Product is not found', status: 404 };
      }

      // If product stock is 0
      // And user trying to addToCart
      if (product.stock == 0) {
        throw { msg: 'Product is out of stock', status: 400 };
      }

      const [cart, newCart] = await Cart.findOrCreate({
        where: { userId, productId, status: false },
        defaults: { userId, productId, status: false, quantity: 1 },
      });

      // Increment old cart quantity or simply return created one
      if (!newCart) {
        if (
          cart.quantity == product.stock &&
          cart.quantity + 1 > product.stock
        ) {
          throw {
            msg: "Quantity can't be more than available stock",
            status: 400,
          };
        }

        const incrementCart = await cart.increment('quantity');
        return res
          .status(201)
          .json({ msg: 'Product added to cart', cart: incrementCart });
      }

      return res
        .status(201)
        .json({ msg: 'Product added to cart', cart: newCart });
    } catch (error) {
      next(error);
    }
  }

  static async editCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      let { productId, increment } = req.body;
      increment = JSON.parse(increment);

      const product = await Product.findByPk(productId);
      if (!product) {
        throw { msg: 'Product is not found', status: 404 };
      }
      const result = await Cart.findByPk(id);
      if (!result) {
        throw { msg: 'Cart is not found', status: 404 };
      }

      // If product quantity is 0
      // And user trying to addToCart
      if (product.stock == 0) {
        throw { msg: 'Product is out of stock', status: 400 };
      }

      let cart;

      // Increment quantity by 1
      if (increment) {
        if (
          result.quantity == product.stock &&
          result.quantity + 1 > product.stock
        ) {
          throw {
            msg: "Quantity can't be more than available stock",
            status: 400,
          };
        }
        cart = await result.increment('quantity');
      }

      // Decrement quantity by 1
      if (!increment) {
        if (result.quantity - 1 === 0) {
          await result.destroy();
          return res
            .status(200)
            .json({ msg: 'Product deleted from cart', cart: result });
        }

        cart = await result.decrement('quantity');
      }

      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const cart = await Cart.findByPk(id);
      if (!cart) {
        throw { msg: 'Cart is not found', status: 404 };
      }

      await cart.destroy();

      res.status(200).json({ msg: 'Product deleted from cart', cart });
    } catch (error) {
      next(error);
    }
  }

  static async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.userData;

      const cart = await Cart.findAll({
        where: {
          userId: id,
          status: false,
        },
        include: {
          model: Product,
          as: 'product',
        },
      });
      /**
       Cart
       { userId, productId, stock, status, product: { name:..., price:..., stock:... } }
       FIND ALL cart WITH products
       FOREACH `product`.stock MINUS WITH `cart`.quantity
       THEN UPDATE Cart `status` INTO true
       */

      const updateCart = cart.map(item => {
        return Product.update(
          // @ts-ignore
          { stock: item.product.stock - item.quantity },
          {
            where: {
              id: item.productId as number,
            },
          }
        );
      });

      await Cart.update(
        { status: true },
        {
          where: {
            userId: id,
            status: false,
          },
        }
      );

      await Promise.all(updateCart);

      res.status(200).json({ msg: 'Checkout success', cart });
    } catch (error) {
      next(error);
    }
  }

  static async getTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.userData;

      const carts = await Cart.findAll({
        where: {
          userId: id,
          status: true,
        },
        include: {
          model: Product,
          as: 'product',
        },
      });

      res.status(200).json(carts);
    } catch (error) {
      next(error);
    }
  }
}

export default CartController;
