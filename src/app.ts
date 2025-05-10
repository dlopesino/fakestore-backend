// import { runMassiveLoad } from './interface/cli/loadData';

import { envs } from './config';
import { AppRoutes, Server } from './presentation';

async function main() {
  //   await runMassiveLoad();
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });
  server.start();
}

main();
