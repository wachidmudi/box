import { NextFunction, Request, Response } from 'express';

class HomeController {
  static home(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ msg: 'Welcome to e-commerce server' });
  }
}

export default HomeController;
