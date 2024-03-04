import { Request, Response } from 'express';

class HomeController {
  static home(req: Request, res: Response) {
    res.status(200).json({ status: 200, msg: 'Welcome to Kanban endpoint' });
  }
}

export default HomeController;
