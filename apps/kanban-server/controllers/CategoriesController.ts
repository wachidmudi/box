import { NextFunction, Request, Response } from 'express';
import models from '../models';

const { Category, Task, Tag, User } = models;

class CategoriesController {
  static async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await Category.findAll({
        include: [
          {
            model: Task,
            include: [
              {
                model: Tag,
              },
              {
                model: User,
                attributes: ['name'],
              },
            ],
          },
        ],
        order: [[Task, 'updatedAt', 'DESC']],
      });

      res.status(200).json({ categories });
    } catch (error) {
      next(error);
    }
  }

  static async addCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;

      const category = await Category.create({ title });

      res.status(201).json({ msg: 'category created successfully', category });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { title } = req.body;

      const category = await Category.update(
        { title },
        {
          where: { id },
          returning: true,
        }
      );

      if (!category[0]) {
        throw { msg: 'Category not found', statusCode: 404 };
      }

      res.status(200).json({
        msg: 'category updated successfully',
        category: category[1][0],
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);

      if (!category) {
        throw { msg: 'Category not found', statusCode: 404 };
      }

      await category.destroy();

      res.status(200).json({ msg: 'category deleted successfully', category });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoriesController;
