import { NextFunction, Request, Response } from 'express';

import models from '../models';

const { Task, Category, TaskTag } = models;

class TasksController {
  static async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req.userData;

      const tasks = await Task.findAll({
        include: {
          model: Category,
          attributes: ['title'],
        },
        where: { user_id },
      });

      res.status(200).json({ tasks });
    } catch (error) {
      next(error);
    }
  }

  static async addTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req.userData;
      const { title, description, category_id, tags } = req.body;

      const task = await Task.create(
        { title, description, user_id, category_id },
        {
          include: {
            model: Category,
            attributes: ['title'],
          },
        }
      );

      if (tags.length) {
        const tasktags = tags.map((i: number) =>
          TaskTag.create({ task_id: task.id, tag_id: i })
        );
        Promise.all(tasktags);
      }

      res.status(201).json({ msg: 'Task successfully created', task });
    } catch (error) {
      next(error);
    }
  }

  static async updateTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { user_id } = req.userData;
      const { title, description, category_id, tags } = req.body;

      let taskObj = { title, description, category_id };

      await Task.update(taskObj, {
        where: { id, user_id },
      });

      const task = await Task.findOne({
        where: { id, user_id },
        include: {
          model: Category,
          attributes: ['title'],
        },
      });

      if (tags.length && task) {
        await TaskTag.destroy({
          where: { task_id: task.id },
        });

        const tasktags = tags.map((i: number) =>
          TaskTag.create({ task_id: task.id, tag_id: i })
        );
        Promise.all(tasktags);
      }

      res.status(200).json({ msg: 'Task successfully updated', task });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategoryTask(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { user_id } = req.userData;
      const { category_id } = req.body;

      await Task.update(
        { category_id },
        {
          where: { id, user_id },
        }
      );

      const task = await Task.findOne({
        where: { id, user_id },
        include: {
          model: Category,
          attributes: ['title'],
        },
      });

      res.status(200).json({ msg: 'Task successfully updated', task });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { user_id } = req.userData;

      const task = await Task.findOne({
        where: { id, user_id },
        include: {
          model: Category,
          attributes: ['title'],
        },
      });

      if (!task) {
        throw { msg: 'Task not found' };
      }

      await TaskTag.destroy({
        where: {
          task_id: id,
        },
      });

      await task.destroy();

      res.status(200).json({ msg: 'Task deleted successfully', task });
    } catch (error) {
      next(error);
    }
  }
}

export default TasksController;
