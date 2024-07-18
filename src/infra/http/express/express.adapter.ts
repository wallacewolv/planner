import bodyParser from 'body-parser'
import cors from 'cors'
import express, { NextFunction, Request, response, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../swagger/swagger-output.json'
import { Logger } from '../../logger/contracts/logger.interface'
import { HttpServer } from '../contracts/http-server.interface'

export class ExpressAdapter implements HttpServer {
    private app: any
    logger: any

    constructor(logger: Logger) {
        this.app = express()
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.logger = logger
        this.app.use(
            'planner/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile)
        )
    }

    post(url: string, callback: Function): void {
        this.app.post(
            url,
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const output = await callback(req.params, req.body)
                    this.sendResponse(output, res)
                } catch (error) {
                    next(error)
                }
            }
        )
    }
    
    get(url: string, callback: Function): void {
        this.app.get(
            url,
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const output = await callback(req.params, req.body, req.query)
                    this.sendResponse(output, res)
                } catch (error) {
                    next(error)
                }
            }
        )
    }

    put(url: string, callback: Function): void {
        this.app.put(
            url,
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const output = await callback(req.params, req.body)
                    this.sendResponse(output, res)
                } catch (error) {
                    next(error)
                }
            }
        )
    }

    delete(url: string, callback: Function): void {
        this.app.delete(
            url,
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const output = await callback(req.params, req.body)
                    this.sendResponse(output, res)
                } catch (error) {
                    next(error)
                }
            }
        )
    }

    private sendResponse(output: any, res: Response): void {
        if (output.statusCode >= 200 && output.statusCode <= 299) {
            res.status(output.statusCode).json(output.body).end()
        } else {
            res.status(output.statusCode).json({
                error: output.body.message,
            })
        }
    }

    listen(port: number): void {
        this.app.listen(port, () => {
            this.logInfo(`Server is running -> port ${port}`)
        })
    }

    defaultErrorHandler(): void {
        this.app.use(
            (
                err: Error,
                _request: Request,
                _response: Response,
                _next: NextFunction,
            ) => {
                this.logger.error(err.stack || '')
                response.status(500).json({
                    message: `Internal server error`
                })
            },
        )
    }
    
    logInfo(data: string): void {
    this.logger.info(data)    
    }

    logError(data: string): void {
        this.logger.error(data)
    }


    logWarn(data: string): void {
        this.logger.warn(data)
    }
}