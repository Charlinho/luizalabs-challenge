import logger from './core/logger';
import environment from './core/environment';

import server from './domains/server';

async function main() {
    await server.listen({ port: environment.PORT, host: environment.HOST });
    logger.info(`Running at http://${environment.HOST}:${environment.PORT}`);
  }

main();