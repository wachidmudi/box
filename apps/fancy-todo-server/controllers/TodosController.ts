import axios from 'axios';

import { NextFunction, Request, Response } from 'express';
import models from '../models';
import { TodoInstance } from '../models/todo';

const { Todo } = models;

class TodosController {
  static getAll(req: Request, res: Response, next: NextFunction) {
    const { id } = req.userData;

    Todo.findAll({
      where: { user_id: id },
    })
      .then(data => {
        if (!data) {
          throw { msg: 'Todos not found', statusCode: 404 };
        }
        res.status(200).json({ data });
      })
      .catch(next);
  }

  static create(req: Request, res: Response, next: NextFunction) {
    const { id } = req.userData;

    const { title, description, status, due_date } = req.body;

    Todo.create({ title, description, status, due_date, user_id: id })
      .then(data =>
        res.status(201).json({ msg: 'todo created successfully', data })
      )
      .catch(next);
  }

  static update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;

    Todo.update(
      { title, description, status, due_date },
      {
        where: {
          id,
          user_id: req.userData.id,
        },
        returning: true,
      }
    )
      .then(data => {
        res
          .status(200)
          .json({ msg: 'todo updated successfully', data: data[1][0] });
      })
      .catch(next);
  }

  static delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    let data: TodoInstance | null = null;

    Todo.findOne({
      where: {
        id,
        user_id: req.userData.id,
      },
    })
      .then(todo => {
        if (!todo) throw { msg: 'Todo not found' };
        data = todo;
        return todo.destroy();
      })
      .then(() =>
        res.status(200).json({ msg: 'todo deleted successfully', data })
      )
      .catch(next);
  }

  static async getImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { search } = req.query;

      if (typeof search !== 'string') {
        throw { msg: 'search term is required', statusCode: 400 };
      }

      const images = await searchPexels(search);

      res.status(200).json({ images });
    } catch (error) {
      next(error);
    }

    function searchPexels(text: string) {
      const baseUrl = 'https://api.pexels.com/v1/search';

      return axios
        .get(baseUrl, {
          params: {
            query: text,
            per_page: 8,
          },
          headers: {
            Authorization: process.env.PEXELS_API_KEY,
          },
        })
        .then(data => data.data.photos);
    }
  }

  static updateImage(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { imageUrl } = req.body;

    Todo.update(
      { image_url: imageUrl },
      {
        where: { id },
      }
    )
      .then(() => {
        res.status(200).json({ msg: 'todo thumbnail updated successfully' });
      })
      .catch(next);
  }

  static updateColor(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { color } = req.body;

    Todo.update(
      { color },
      {
        where: { id },
      }
    )
      .then(() => {
        res.status(200).json({ msg: 'todo color updated successfully' });
      })
      .catch(next);
  }

  static updateStatus(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { status } = req.body;

    Todo.update(
      { status },
      {
        where: { id },
      }
    )
      .then(() => {
        res.status(200).json({ msg: 'todo status updated successfully' });
      })
      .catch(next);
  }
}

export default TodosController;
