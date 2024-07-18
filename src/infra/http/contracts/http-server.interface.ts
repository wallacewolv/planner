export interface HttpServer {
    listen(port: number): void;
    post(url: string, callback: Function): void;
    get(url: string, callback: Function): void;
    put(url: string, callback: Function): void;
    delete(url: string, callback: Function): void;
    logInfo(data: string): void;
    logError(data: string): void;
    logWarn(data: string): void;
    defaultErrorHandler(): void;
}