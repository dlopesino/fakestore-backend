import { Router, Request, Response } from 'express';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/', (req: Request, res: Response) => {
      res.status(200).json([
        {
          id: 1,
          firstName: 'user one',
          lastName: 'noseque',
        },
        {
          id: 2,
          firstName: 'user two',
          lastName: 'tal',
        },
      ]);
    });

    return router;
  }
}
