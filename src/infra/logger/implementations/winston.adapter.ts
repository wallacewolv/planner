import winston, { level } from 'winston'

import { Logger } from "../contracts/logger.interface";

export class WinstonLoggerAdapter implements Logger {
    private logger: any

    constructor() {
        this.logger = winston.createLogger({
            levels: winston.config.syslog.levels,
            transports: [
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'info.log', level: 'info' }),
                new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
            ]
        })

        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(
                new winston.transports.Console({
                    format: winston.format.simple(),
                })
            )
        }
    }

    info(message: string): void {
        this.logger.info({
            level: 'info',
            message,
        })
    }

    error(message: string): void {
        this.logger.info({
            level: 'error',
            message,
        })
    }

    warn(message: string): void {
        this.logger.warn({
            level: 'warn',
            message,
        })
    }
}