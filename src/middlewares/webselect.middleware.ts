import { Injectable, NestMiddleware } from "@nestjs/common";
import { AppService } from "../app.service";
import { webScrabConfig } from "../config";
import { Request } from 'express';

@Injectable()
export class WebselectMiddleware implements NestMiddleware {
    constructor(private appService: AppService) {}

    async use(req: Request, res: Response, next: Function) {
        if(req.query.webConfig) {
            this.appService.webConfig = webScrabConfig[req.query.webConfig];
            await this.appService.initWebScrap();
        }

        next();
    }
}