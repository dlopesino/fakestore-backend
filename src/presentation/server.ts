import cors from 'cors';
import express, { Router } from 'express';
import { errorHandler } from '../infraestructure/http';

interface ServerProps {
  port: number;
  routes: Router;
}
export class Server {
  private readonly port: number;
  private readonly routes: Router;
  private readonly app = express();

  constructor(props: ServerProps) {
    const { port, routes } = props;
    this.port = port;
    this.routes = routes;
  }

  start() {
    this.app.use(
      cors({
        origin: 'http://localhost:5173',
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(this.routes);
    this.app.use(errorHandler);

    this.app.listen(this.port, () => {
      console.log(`Server listen at port: ${this.port}`);
    });
  }
}
