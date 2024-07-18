import dotenv from 'dotenv';

import { ExpressAdapter } from './infra/http/express/express.adapter';
import { Router } from './infra/http/routes';
import { HealthCheckRoutes } from './infra/http/routes/heath-check.routes';
import { WinstonLoggerAdapter } from './infra/logger/implementations/winston.adapter';

dotenv.config()
const port: number = Number(process.env.PORT) || 8080

const httpServer = new ExpressAdapter(new WinstonLoggerAdapter())
httpServer.listen(port)

const router = new Router([
    new HealthCheckRoutes(httpServer),
])

router.init()

httpServer.defaultErrorHandler()