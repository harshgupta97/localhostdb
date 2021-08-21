import { NextFunction, Request, Response, Router } from "express";
import Logger from "../utility/logger.winston";
import DBService from "./db.service";

export interface IController {
    path: string;
    router: Router
}

class DBController implements IController {

    public path: string = "";
    public router: Router = Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes(): any {
        this.router.get(`${this.path}`, this.healthCheck);
        this.router.head(`${this.path}`, this.healthCheck);
        this.router.post(`${this.path}`, this.database);
    }

    private healthCheck = (request: Request, response: Response) => {
        response.status(200).send({ message: `✌ Local storage is running and connection is healthy` });
    }

    private database = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = new DBService(request);
            response.status(200).send(result);
        } catch (error: any) {
            Logger.error(`🔥 Error -> ${error} `);
            next(error);
        }
    }

}

export default DBController;