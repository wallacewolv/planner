import { RouterHandle } from "../contracts/handler.interface";


export class Router {
    constructor(readonly httRouterHandle: RouterHandle[]) { }

    async init(): Promise<void> {
        this.httRouterHandle.forEach((route) => route.init())
    }
}