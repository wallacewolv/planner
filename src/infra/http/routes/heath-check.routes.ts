import { ok } from "../../../presentation/helpers/http-helper";
import { RouterHandle } from "../contracts/handler.interface";
import { HttpServer } from "../contracts/http-server.interface";

export class HealthCheckRoutes implements RouterHandle {
    constructor(readonly httpServer: HttpServer) {}

     async init(): Promise<void> {
        this.httpServer.get(
            '/planner',
        async (_params: any, _body: any) => {
            return ok({ status: 'UP'})
            // #swagger.tags = ['Health Check']
            /* #swagger.security = [{
                "bearerAuth":[]
            }]*/
            // #swagger.summary = 'Health Check API'
            // #swagger.description = 'Specific route for check API lifecycle
        })    
    }
}