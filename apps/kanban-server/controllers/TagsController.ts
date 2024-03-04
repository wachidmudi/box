import { NextFunction, Request, Response } from 'express';

import models from '../models';

const { Tag } = models;

class TagsController {
  static async getTags(req: Request, res: Response, next: NextFunction) {
    try {
      const tags = await Tag.findAll();

      res.status(200).json({ tags });
    } catch (error) {
      next(error);
    }
  }

  static async addTags(
    req: Request<{}, {}, { title: string; color: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, color } = req.body;

      const tag = await Tag.create({ title, color });

      res.status(201).json({ msg: 'Tag successfully created', tag });
    } catch (error) {
      next(error);
    }
  }

  static async updateTags(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title, color } = req.body;

      const tag = await Tag.update(
        { title, color },
        {
          where: { id },
          returning: true,
        }
      );

      if (!tag[0]) {
        throw { msg: 'Tag not found', statusCode: 404 };
      }

      res.status(200).json({ msg: 'Tag successfully updated', tag: tag[1][0] });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTags(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const tag = await Tag.findByPk(id);

      if (!tag) {
        throw { msg: 'Tag not found', statusCode: 404 };
      }

      await tag.destroy();

      res.status(200).json({ msg: 'Tag successfully deleted', tag });
    } catch (error) {
      next(error);
    }
  }
}

export default TagsController;
